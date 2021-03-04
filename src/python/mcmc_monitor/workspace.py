import time
import uuid
import kachery_p2p as kp

def parse_workspace_uri(workspace_uri: str):
    if not workspace_uri.startswith('workspace://'):
        raise Exception(f'Invalid workspace uri: {workspace_uri}')
    a = workspace_uri.split('/')
    return a[2], a[3]

class Workspace:
    def __init__(self, workspace_uri: str) -> None:
        if not workspace_uri.startswith('workspace://'):
            default_feed = kp.load_feed('default-mcmc-monitor-feed', create=True)
            workspace_uri = f'workspace://{default_feed.get_feed_id()}/{workspace_uri}'
        self._workspace_uri = workspace_uri
        feed_id, workspace_name = parse_workspace_uri(self._workspace_uri)
        self._feed = kp.load_feed(f'feed://{feed_id}')
        self._workspace_name = workspace_name
        workspace_subfeed = self._feed.get_subfeed(dict(workspaceName=self._workspace_name))
        self._runs = _get_runs_from_subfeed(workspace_subfeed)
    def get_workspace_uri(self):
        return self._workspace_uri
    def get_subfeed_uri(self):
        workspace_subfeed = self._feed.get_subfeed(dict(workspaceName=self._workspace_name))
        return workspace_subfeed.get_uri()
    def get_workspace_name(self):
        return self._workspace_name
    def add_run(self, *, label: str, metadata: dict):
        run_id = 'run-' + _random_id()
        if run_id in self._runs:
            raise Exception(f'Duplicate run ID: {run_id}')
        run_subfeed = self._feed.get_subfeed(run_id)
        x = {
            'runId': run_id,
            'runLabel': label,
            'metaData': metadata,
            'uri': run_subfeed.get_uri(),
            'runtime': {
                'nodeId': kp.get_node_id()
            },
            'timestamp': time.time(),
            'mcmcMonitorVersion': '0.1.7'
        }
        workspace_subfeed = self._feed.get_subfeed(dict(workspaceName=self._workspace_name))
        workspace_subfeed.append_message({
            'type': 'AddRun',
            'run': x
        })
        self._runs[run_id] = x
        return run_id
    def delete_run(self, run_id: str):
        if run_id not in self._runs:
            raise Exception(f'Run not found: {run_id}')
        workspace_subfeed = self._feed.get_subfeed(dict(workspaceName=self._workspace_name))
        workspace_subfeed.append_message({
            'type': 'DeleteRuns',
            'runIds': [run_id]
        })
        del self._run[run_id]
    def get_run(self, run_id: str):
        return self._runs[run_id]
    def get_run_ids(self):
        return list(self._runs.keys())

def _get_runs_from_subfeed(subfeed: kp.Subfeed):
    subfeed.set_position(0)
    runs = {}
    while True:
        msg = subfeed.get_next_message(wait_msec=0)
        if msg is None: break
        if 'type' in msg:
            if msg['type'] == 'AddRun':
                run = msg.get('run', None)
                if run is not None:
                    runs[run['runId']] = run
            elif msg['type'] == 'DeleteRuns':
                for rid in msg.get('runIds', []):
                    if rid in runs:
                        del runs[rid]
    return runs

def load_workspace(workspace_uri: str='default'):
    return Workspace(workspace_uri=workspace_uri)

def _random_id():
    return str(uuid.uuid4())[-12:]