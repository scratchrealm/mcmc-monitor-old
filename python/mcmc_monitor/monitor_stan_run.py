import multiprocessing
import kachery_p2p as kp
import os
from typing import List

def monitor_stan_run(run: dict, output_dir: str, parameter_keys: List[str]):
    # make sure we can successfully load the run subfeed
    run_subfeed = kp.load_subfeed(run['uri'])

    worker_process =  multiprocessing.Process(target=_start_monitoring, args=(run, output_dir, parameter_keys))
    worker_process.start()

def finalize_monitor_stan_run(output_dir):
    fname = f'{output_dir}/finalize_stan_run'
    time.sleep(5)
    with open(fname, 'w') as f:
        f.write('Finalizing monitoring of stan run')
    # wait until file disappears
    while os.path.exists(fname):
        time.sleep(1)

import os
import time
from typing import Dict, List

class OutputCsvFile:
    def __init__(self, path, subfeed: kp.Subfeed, parameter_keys: List[str]):
        self._path = path
        self._parameter_keys = parameter_keys
        self._chain_id = _chain_id_from_csv_file_name(path)
        self._subfeed = subfeed
        self._file = open(self._path, 'r')
        self._num_lines_processed = 0
        self._header_fields = None
    def cleanup(self):
        self._file.close()
    def path(self):
        return self._path
    def num_lines_processed(self):
        return self._num_lines_processed
    def iterate(self):
        lines = self._file.readlines()
        if len(lines) > 0:
            self._process_lines(lines)
            self._num_lines_processed += len(lines)
            return True
        else:
            return False
    def _process_lines(self, lines: List[str]):
        messages = []
        for line in lines:
            if line.startswith('#'):
                messages.append({
                    'type': 'comment',
                    'timestamp': time.time(),
                    'text': line
                })
            else:
                vals = line.strip().split(',')
                if self._header_fields is None:
                    self._header_fields = vals
                else:
                    parameters = {}
                    for ii, k in enumerate(self._header_fields):
                        if ii < len(vals):
                            if (k in self._parameter_keys):
                                parameters[k] = float(vals[ii])
                    messages.append({
                        'type': 'iteration',
                        'timestamp': time.time(),
                        'chainId': self._chain_id,
                        'parameters': parameters
                    })
            if len(messages) > 20:
                self._subfeed.append_messages(messages)
                messages = []
        if len(messages) > 0:
            self._subfeed.append_messages(messages)

def _chain_id_from_csv_file_name(path: str):
    # should end with '-<id>.csv'
    ind = path.rindex('-')
    return int(path[ind+1:].split('.')[0])

class OutputMonitor:
    def __init__(self, output_dir: str, subfeed: kp.Subfeed, parameter_keys: List[str]):
        self._output_dir = output_dir
        self._subfeed = subfeed
        self._parameter_keys = parameter_keys
        self._output_csv_files: Dict[str, OutputCsvFile] = {}
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_value, exc_tb):
        for fname, x in self._output_csv_files.items():
            x.cleanup()
    def start_iterating(self, interval=1):
        while True:
            if self.iterate():
                pass
                # self.print_status()
            if not os.path.exists(self._output_dir):
                break
            fname0 = f'{self._output_dir}/finalize_stan_run'
            if os.path.exists(fname0):
                os.unlink(fname0)
                break
            time.sleep(interval)
    def print_status(self):
        total_lines_processed = sum([x.num_lines_processed() for x in self._output_csv_files.values()])
        print(f'{total_lines_processed} lines processed in {len(self._output_csv_files.values())} files')
    def iterate(self):
        if not os.path.exists(self._output_dir):
            return
        for fname in os.listdir(self._output_dir):
            if fname.endswith('.csv'):
                if fname not in self._output_csv_files:
                    self._output_csv_files[fname] = OutputCsvFile(f'{self._output_dir}/{fname}', self._subfeed, self._parameter_keys)
        something_updated = False
        for fname in list(self._output_csv_files.keys()):
            x = self._output_csv_files[fname]
            if os.path.exists(x.path()):
                if x.iterate():
                    something_updated = True
            else:
                print(f'Closing {fname}')
                x.cleanup()
                something_updated = True
                del self._output_csv_files[fname]
        return something_updated


def _start_monitoring(run: dict, output_dir: str, parameter_keys: List[str]):
    # sys.stdout = open('debug_' + str(os.getpid()) + ".out", "a")
    # sys.stderr = open('debugerr_' + str(os.getpid()) + "_error.out", "a")
    run_subfeed = kp.load_subfeed(run['uri'])
    with OutputMonitor(output_dir, run_subfeed, parameter_keys) as m:
        m.start_iterating(0.1)
