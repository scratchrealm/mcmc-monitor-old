from typing import List, Union
import figurl as fig
import kachery_client as kc
import time
class MCMCRun:
    def __init__(self, *, label: str) -> None:
        self._label = label
        self._timestamp = time.time()
        self._records: List[dict] = []
        self._feed: Union[None, kc.Feed] = None
        self._subfeed: Union[None, kc.Subfeed] = None
        self._pending_records: List[dict] = []
        self._last_write_timestamp = time.time()
    @property
    def label(self):
        return self._label
    @property
    def timestamp(self):
        return self._timestamp
    def add_record(self, record: dict):
        self._pending_records.append(record)
        elapsed = time.time() - self._last_write_timestamp
        if (elapsed > 5) or (len(self._pending_records) >= 20):
            self._write_pending_records()
    def _write_pending_records(self):
        if len(self._pending_records) == 0:
            return
        self.get_subfeed().append_message({'records': self._pending_records})
        self._pending_records = []
        self._last_write_timestamp = time.time()
    def finalize(self):
        self._write_pending_records()
    def get_subfeed(self) -> kc.Subfeed:
        if self._subfeed is None:
            f = kc.create_feed()
            self._feed = f
            self._subfeed = f.load_subfeed('main')
        return self._subfeed
    def figurl(self):
        data = {
            'type': 'mcmcRun',
            'runUri': self.get_subfeed().uri,
            'runLabel': self._label
        }
        return fig.Figure(view_url='gs://figurl/mcmc-monitor-1', data=data)