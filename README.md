# MCMC Monitor

Monitor MCMC runs.

## Installation and setup

It is recommended that you start with a fresh conda environment with Python 3.8 or higher. For example:

```bash
conda create -n mcmc-monitor python=3.8
```

After activating the new environment (`conda activate mcmc-monitor`), install the following prerequisite packages:

```
conda install -c conda-forge nodejs
npm install -g serve
```

Install the latest mcmc-monitor:

```
pip install --upgrade mcmc-monitor
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

You should now be able to open the web app in a browser at http://localhost:10407. This will display an empty workspace (you haven't yet monitored any runs). You are now ready for the first example.

## Example: multi-normal Stan

With the kachery daemon and the web app running you are now ready to try out your first MCMC run. Run the following inside the conda environment created above:

```
python examples/multi_normal_example.py
```





