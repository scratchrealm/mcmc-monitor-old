import multiprocessing
import kachery_p2p as kp
import sys

def monitor_stan_run(run, output_dir):
    # make sure we can successfully load the run subfeed
    run_subfeed = kp.load_subfeed(run['uri'])

    worker_process =  multiprocessing.Process(target=_start_monitoring, args=(run, output_dir))
    worker_process.start()


import os
import time
from typing import Dict

class OutputCsvFile:
    def __init__(self, path, subfeed: kp.Subfeed):
        self._path = path
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
            for line in lines:
                self._process_line(line)
            self._num_lines_processed += len(lines)
            return True
        else:
            return False
    def _process_line(self, line: str):
        if line.startswith('#'):
            self._subfeed.append_message({
                'type': 'comment',
                'timestamp': time.time(),
                'text': line
            })
            return
        vals = line.split(',')
        if self._header_fields is None:
            self._header_fields = vals
            return
        parameters = {}
        for ii, k in enumerate(self._header_fields):
            if ii < len(vals): parameters[k] = float(vals[ii])
        self._subfeed.append_message({
            'type': 'iteration',
            'timestamp': time.time(),
            'parameters': parameters
        })

class OutputMonitor:
    def __init__(self, output_dir: str, subfeed: kp.Subfeed):
        self._output_dir = output_dir
        self._subfeed = subfeed
        self._output_csv_files: Dict[str, OutputCsvFile] = {}
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_value, exc_tb):
        for fname, x in self._output_csv_files.items():
            x.cleanup()
    def start_iterating(self, interval=1):
        while True:
            if not os.path.exists(self._output_dir):
                break
            if self.iterate():
                self.print_status()
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
                    self._output_csv_files[fname] = OutputCsvFile(f'{self._output_dir}/{fname}', self._subfeed)
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


def _start_monitoring(run, output_dir):
    # sys.stdout = open('debug_' + str(os.getpid()) + ".out", "a")
    # sys.stderr = open('debugerr_' + str(os.getpid()) + "_error.out", "a")
    run_subfeed = kp.load_subfeed(run['uri'])
    with OutputMonitor(output_dir, run_subfeed) as m:
        m.start_iterating(0.3)
