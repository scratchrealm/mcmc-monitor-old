# MCMC Monitor

Browser-based monitoring of MCMC runs.

This project uses [Stan](https://mc-stan.org/), [CmdStan](https://mc-stan.org/users/interfaces/cmdstan), [CmdStanPy](https://github.com/stan-dev/cmdstanpy), [React](https://reactjs.org/), [kachery-p2p](https://github.com/flatironinstitute/kachery-p2p), and [labbox](https://github.com/flatironinstitute/labbox).

Tested on Linux, should also run on macOS and Windows Subsystem for Linux.

## Prerequisites and kachery setup

It is recommended that you start with a fresh conda environment with Python 3.8 or higher. For example:

```bash
conda create -n mcmc-monitor python=3.8
```

After activating the new environment (`conda activate mcmc-monitor`), install the following prerequisite packages:

```
conda install -c conda-forge nodejs
npm install -g serve
pip install mcmc-monitor
```

Choose a directory where temporary kachery files will be stored and set the KACHERY_STORAGE_DIR environment variable:

```
export KACHERY_STORAGE_DIR="<your-chosen-tmp-file-directory>" 
```

Open a new terminal and start a kachery-p2p daemon, selecting a `<node-label>` for display purposes:

```
kachery-p2p-daemon --label <node-label>
```

Keep this running. It allows communication between the Python script and the GUI. For more information, see [kachery-p2p](https://github.com/flatironinstitute/kachery-p2p).

## Installing and running the app

Upgrade to the latest mcmc-monitor (it may be worth restarting the kachery daemon in case updates have been made to the kachery-p2p package):

```
pip install --upgrade mcmc-monitor
```

Now run the mcmc-monitor service:

```
mcmc-monitor
```

Open the web app in a browser at http://localhost:10407. This should display an empty workspace (you haven't yet monitored any runs). You are now ready for the first example.

## First example: multi-normal Stan

With the kachery daemon and the web app running you are now ready to try out your first MCMC run. Run the following inside the conda environment created above:

```
python examples/multi_normal_example.py
```

A few seconds after the sampling begins, a new run should appear in the workspace on the web browser. Click on that to monitor in real time the progress and convergence of the MCMC sampling.


## Primary developers

Jeremy Magland and Jeff Soules, Center for Computational Mathematics, Flatiron Institute

Thanks: Bob Carpenter and Mitzi Morris
