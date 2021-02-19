import codecs
import os.path

import setuptools

setuptools.setup(
    name='mcmc-monitor',
    version='0.1.0',
    author="Jeremy Magland",
    author_email="jmagland@flatironinstitute.org",
    description="",
    url="https://github.com/magland/mcmc-monitor",
    packages=setuptools.find_packages(),
    include_package_data=True,
    scripts=[
    ],
    install_requires=[
        'numpy',
        'scipy',
        'hither>=0.4.2',
        'kachery-p2p>=0.5.24',
        'labbox==0.1.18'
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
    ]
)
