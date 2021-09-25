from typing import List, Union
from cmdstanpy import CmdStanModel
from mcmc_monitor import StanMonitor
import os

def main():
    # These are adjustable parameters
    rho = 0.998 # rho should be <1. Larger values make correspond to longer iterations.
    N = 200
    iter_warmup = 10 # Number of warmup iterations
    iter_sampling = 200 # Number of sampling iterations
    ##################################

    # specify .stan file for this model
    thisdir = os.path.dirname(os.path.realpath(__file__))
    model_fname = f'{thisdir}/multi-normal.stan'

    with StanMonitor( # The stan monitor is a context manager
        label='multi-normal-example',
        # monitor these parameters
        parameter_names=["lp__", "accept_stat__", "stepsize__", "treedepth__", "n_leapfrog__", "divergent__", "energy__"],
        # attach meta data (for future use)
        meta_data={}
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
            save_warmup=False
        )

if __name__ == '__main__':
    main()