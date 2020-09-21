"""
    Flask-Redisboard
    ~~~~~~~~~~~~~~
    A flask extension to support user view and manage redis with beautiful interface.
    :author: hjlarry<ultrahe@gmail.com>
    :copyright: (c) 2019 by hjlarry.
    :license: MIT, see LICENSE for more details.
"""
from setuptools import setup

setup(
    name="redisweb",
    version="1.0.8",
    url="https://github.com/abo123456789/flask-redisboard",
    license="MIT",
    author="hjlarry",
    author_email="ultrahe@gmail.com",
    description="A flask extension to support user view and manage redis with beautiful interface.",
    long_description=open('README.md', encoding='utf-8').read(),
    long_description_content_type="text/markdown",
    platforms="any",
    packages=["redisweb"],
    zip_safe=False,
    include_package_data=True,
    install_requires=["Flask", "redis"],
    entry_points={
        'console_scripts': ['redisweb=redisweb.main:create_app'],
    },
    package_data={
        '': ['src/*', 'static/*', 'templates/*']
    },
    data_files="",
    extras_require={"dev": ["black"]},
    keywords="flask extension development redis",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires='>=3.6',
)
