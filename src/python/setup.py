import setuptools

setuptools.setup(
    packages=setuptools.find_packages(),
    include_package_data=True,
    scripts=[
        "bin/mcmc-monitor",
        "bin/mcmc-monitor-services"
    ],
    install_requires=[
        'cmdstanpy',
        'numpy',
        'scipy',
        "aiohttp",
        "aiohttp_cors",
        'labbox>=0.1.26',
        'jinjaroot>=0.0.2'
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
    ]
)