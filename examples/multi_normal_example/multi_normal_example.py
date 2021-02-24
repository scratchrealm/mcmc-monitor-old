import os
from cmdstanpy import CmdStanModel
from mcmc_monitor import MCMCMonitorStan

def main():
    # specify .stan file for this model
    thisdir = os.path.dirname(os.path.realpath(__file__))
    model_fname = f'{thisdir}/multi-normal.stan'

    # These are adjustable
    rho = 0.95
    N = 300
    iter_warmup = 100
    iter_sampling = 100

    # Monitor the stan run using this context manager
    with MCMCMonitorStan(
      run_label='multi-normal-example', # this label will show up in the monitor app
      # monitor these parameters
      parameter_keys=["lp__", "accept_stat__", "stepsize__", "treedepth__", "n_leapfrog__", "divergent__", "energy__"],
      # attach metadata (for future use)
      run_metadata={}
    ) as monitor:
        # Load the model
        model = CmdStanModel(stan_file=model_fname)

        # Start sampling the posterior for this model/data (we need to use monitor.output_dir as the output directory)
        fit = model.sample(data={'N': N, 'rho': rho}, output_dir=monitor.output_dir,
                           iter_sampling=iter_sampling, iter_warmup=iter_warmup, save_warmup=True)

if __name__ == '__main__':
    main()
