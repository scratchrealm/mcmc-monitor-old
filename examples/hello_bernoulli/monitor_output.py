
import os
import time
from typing import Dict

class OutputCsvFile:
    def __init__(self, path):
        self._path = path
        self._file = open(self._path, 'r')
        self._num_lines_processed = 0
    def cleanup(self):
        self._file.close()
    def path(self):
        return self._path
    def num_lines_processed(self):
        return self._num_lines_processed
    def iterate(self):
        lines = self._file.readlines()
        if len(lines) > 0:
            self._num_lines_processed += len(lines)
            return True
        else:
            return False

class OutputMonitor:
    def __init__(self, output_dir: str):
        self._output_dir = output_dir
        self._output_csv_files: Dict[str, OutputCsvFile] = {}
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_value, exc_tb):
        for fname, x in self._output_csv_files.items():
            x.cleanup()
    def start_iterating(self, interval=1):
        while True:
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
                    self._output_csv_files[fname] = OutputCsvFile(f'{self._output_dir}/{fname}')
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

def main():
    thisdir = os.path.dirname(os.path.realpath(__file__))
    output_path = f'{thisdir}/output_'
    with OutputMonitor(output_path) as m:
        m.start_iterating(0.3)

if __name__ == '__main__':
    main()