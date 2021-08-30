from setuptools import setup, find_packages

setup(
    packages=find_packages(),
    scripts=[
        'bin/mcmc-monitor-start-backend'
    ],
    include_package_data = True,
    install_requires=[
        'click',
        'figurl>=0.1.2',
        'pyyaml',
        'cmdstanpy'
    ]
)
