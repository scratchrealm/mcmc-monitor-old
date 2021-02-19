import time
import os
import numpy as np
from cmdstanpy import CmdStanModel
from mcmc_monitor import load_workspace, monitor_stan_run, finalize_monitor_stan_run, TemporaryDirectory

def main():
    # specify .stan file for this model
    thisdir = os.path.dirname(os.path.realpath(__file__))
    model_fname = f'{thisdir}/multi-normal.stan'

    # These are adjustable
    rho = 0.95
    N = 300
    iter_warmup = 100
    iter_sampling = 100

    with TemporaryDirectory(remove=True) as tmpdir:
      output_dir = tmpdir + '/output'
      print(output_dir)
      os.mkdir(output_dir)

      # Load the default mcmc-monitor workspace and create a new run
      monitor_workspace = load_workspace()
      run_id = monitor_workspace.add_run(label='multi_normal_example', metadata={})
      # begin monitoring the output directory for this run
      monitor_stan_run(
        monitor_workspace.get_run(run_id),
        output_dir,
        ["lp__", "accept_stat__", "stepsize__", "treedepth__", "n_leapfrog__", "divergent__", "energy__"]
      )

      # Load the model
      model = CmdStanModel(stan_file=model_fname)

      # Start sampling the posterior for this model/data
      fit = model.sample(data={'N': N, 'rho': rho}, output_dir=output_dir, iter_sampling=iter_sampling, iter_warmup=iter_warmup, save_warmup=True)

      # allow monitoring to finish before removing directory
      finalize_monitor_stan_run(output_dir)

if __name__ == '__main__':
    main()