# MCMC Monitor

Browser-based monitoring of MCMC runs.

## Installation and setup

[Installation and setup](./doc/start-web-server.md)

## First example: multi-normal Stan

With the kachery daemon and the web app running you are now ready to try out your first MCMC run. Run the following inside the conda environment created during installation:

```
python examples/multi_normal_example/multi_normal_example.py
```

A few seconds after the sampling begins, a new run should appear in the workspace on the web browser. Click on that to monitor in real time the progress and convergence of the MCMC sampling.

## Example usage

```python
with MCMCMonitorStan(
    # workspace for storing the run
    workspace_uri='default',
    # label for display on the monitoring app
    run_label='multi-normal-example', 
    # parameters to monitor
    parameter_keys=["lp__", "accept_stat__", "stepsize__", "treedepth__", "n_leapfrog__", "divergent__", "energy__"],
    # attach metadata (for future use)
    run_metadata={}
) as monitor:
    # Load the stan program
    model = CmdStanModel(stan_file=model_fname)

    # Start sampling the posterior for this run (we need to use monitor.output_dir as the output directory)
    fit = model.sample(data={...}, output_dir=monitor.output_dir,
                        iter_sampling=iter_sampling, iter_warmup=iter_warmup, save_warmup=True)
```

## Developer instructions

See [developer_instructions.md](./doc/developer_instructions.md)

## About

This project uses [Stan](https://mc-stan.org/), [CmdStan](https://mc-stan.org/users/interfaces/cmdstan), [CmdStanPy](https://github.com/stan-dev/cmdstanpy), [React](https://reactjs.org/), [kachery-p2p](https://github.com/flatironinstitute/kachery-p2p), and [labbox](https://github.com/flatironinstitute/labbox).

## Primary developers

Jeremy Magland and Jeff Soules, Center for Computational Mathematics, Flatiron Institute

Thanks: Bob Carpenter and Mitzi Morris
