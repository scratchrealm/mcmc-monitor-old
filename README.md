# MCMC Monitor

Monitor MCMC runs.

## Installation and setup

It is recommended that you start with a fresh conda environment with Python 3.8 or higher. For example:

```bash
conda create -n mcmc-monitor python=3.8
```

After activating the new environment (`conda activate mcmc-monitor`), install the following packages:

```
conda install -c conda-forge nodejs
pip install mcmc-monitor
```

Open a new terminal and start a kachery-p2p daemon, selecting a `<node-label>` for display purposes:

```
kachery-p2p-daemon --label <node-label>
```

Keep this running. It allows communication between the Python script and the GUI. For more information, see [kachery-p2p](https://github.com/flatironinstitute/kachery-p2p).

Now run the mcmc-monitor service:

```
mcmc-monitor
```





