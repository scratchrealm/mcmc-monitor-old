# mcmc-monitor

## Prerequisites

Create a new conda environment

Install cmdstanpy: `pip install cmdstanpy`

Install cmdstan: `install_cmdstan`

## Installation and setup

```
pip install --upgrade mcmc-monitor kachery-daemon
```

Start the kachery daemon with your owner

Create a kachery node on kacheryhub.org

Join the mcmc-monitor channel with passcode `ccm1-QSFtVOzx`

Check the boxes for providing feeds and tasks on the mncmc-monitor channel.

Set the FIGURL_CHANNEL environment variable to mcmc-monitor: `export FIGURL_CHANNEL=mcmc-monitor`

Run the `examples/test_stan.py` script. This will give you a figurl link. Open it in your browser.

## Example Python usage

```python
# test_stan.py

from typing import List, Union
from cmdstanpy import CmdStanModel
from mcmc_monitor import StanMonitor
import os

def main():
    # These are adjustable
    rho = 0.95
    N = 350
    iter_warmup = 100
    iter_sampling = 100

    # specify .stan file for this model
    thisdir = os.path.dirname(os.path.realpath(__file__))
    model_fname = f'{thisdir}/multi-normal.stan'

    with StanMonitor(
        label='multi-normal-example',
        # monitor these parameters
        parameter_names=["lp__", "accept_stat__", "stepsize__", "treedepth__", "n_leapfrog__", "divergent__", "energy__"],
        # attach meta data (for future use)
        meta_data={}
        ) as monitor:
            # Load the model
            model = CmdStanModel(stan_file=model_fname)

            # Start sampling the posterior for this model/data (we need to use monitor._output_dir as the output directory)
            fit = model.sample(data={'N': N, 'rho': rho}, output_dir=monitor._output_dir,
                            iter_sampling=iter_sampling, iter_warmup=iter_warmup, save_warmup=True)

if __name__ == '__main__':
    main()
```

```c
# multi-normal.stan

data {
  real<lower = -1, upper = 1> rho;
  int<lower = 0> N;
}  
transformed data {
  vector[N] mu = rep_vector(0, N);
  cov_matrix[N] Sigma;
  for (m in 1:N)
    for (n in 1:N)
      Sigma[m, n] = rho^fabs(m - n);
}
parameters {
  vector[N] y;
}
model {
  y ~ multi_normal(mu, Sigma);
}
```