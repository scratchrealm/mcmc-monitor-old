from typing import List, Union
from cmdstanpy import CmdStanModel
from mcmc_monitor import StanMonitor
import os

def main():
    # These are adjustable parameters
    rho = 0.9 # rho should be <1
    N = 400
    iter_warmup = 20 # Number of warmup iterations
    iter_sampling = 100 # Number of sampling iterations
    ##################################

    # specify .stan file for this model
    thisdir = os.path.dirname(os.path.realpath(__file__))
    model_fname = f'{thisdir}/multi-normal.stan'

    with StanMonitor( # The stan monitor is a context manager
        label='multi-normal-example',
        # monitor these parameters
        parameter_names=["lp__", "accept_stat__", "stepsize__", "treedepth__", "n_leapfrog__", "divergent__", "energy__"]
    ) as monitor:
        # Load the model
        model = CmdStanModel(stan_file=model_fname)

        # Start sampling the posterior for this model/data
        # Use monitor._output_dir as the output directory
        fit = model.sample(
            data={'N': N, 'rho': rho},
            output_dir=monitor._output_dir,
            iter_sampling=iter_sampling,
            iter_warmup=iter_warmup,
            save_warmup=True
        )

if __name__ == '__main__':
    main()