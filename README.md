# mcmc-monitor

Real-time browser-based monitoring of [MCMC](https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo) runs using [figurl](https://github.com/magland/figurl).

While mcmc-monitor is designed to be independent of the underlying MCMC package, right now the only supported use case is with [Stan](https://mc-stan.org/). Contact the authors if you would like to provide adapters for other systems.

## Prerequisites

This software has been tested on Linux, but it should also work on macOS and Windows Subsystem for Linux.

It is highly recommended that you perform all steps in a dedicated conda environment.

### Kachery setup

In order to monitor your own [cmdstanpy](https://github.com/stan-dev/cmdstanpy/blob/develop/README.md) runs, you will need to [host a kachery node](https://github.com/kacheryhub/kachery-doc/blob/main/doc/hostKacheryNode.md) on the computer where you are running your models. This background process allows mcmc-monitor to communicate with the web app. You will also need to [create a kachery channel](https://github.com/kacheryhub/kachery-doc/blob/main/doc/createKacheryChannel.md). Make a note of the kachery channel name that you chose and set the following environment variable:

```bash
# You can put this in your ~/.bashrc file
export FIGURL_CHANNEL=<name-of-your-kachery-channel>
```

### Installing cmdstan and cmdstanpy

To install cmdstan and cmdstanpy:

```bash
pip install cmdstanpy
install_cmdstan
```

For more information see the [cmdstanpy documentation](https://mc-stan.org/cmdstanpy/).

## Getting started

Once your kachery node is up and running and you have the FIGURL_CHANNEL environment variable set, you can install mcmc-monitor

```bash
# Preferably in the same conda environment as kachery
pip install --upgrade mcmc-monitor
```

To get started, try out [test_stan.py](./examples/test_stan.py). Note that the [multi-normal.stan](./examples/multi-normal.stan) file needs to be next next to this `.py` file. This will begin a multi-chain Stan run and will print out a link you can use to monitor the run in a web browser. You can also share that same link with others.
