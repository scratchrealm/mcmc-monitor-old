import click

from mcmc_monitor import StanMonitor

@click.command(help="Monitor Stan output in a given directory.")
@click.argument('directory')
@click.option('--label', help='Label for the stan run')
def mcmc_monitor_stan_cli(directory: str, label: str):
    with StanMonitor(
        output_dir=directory,
        label=label,
        parameter_names='lp__'
    ) as monitor:
        while True: pass