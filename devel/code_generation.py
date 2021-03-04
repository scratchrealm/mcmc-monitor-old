#!/usr/bin/env python3

import os
import json
from jinja2 import Template

def main():
    thisdir = os.path.dirname(os.path.realpath(__file__))
    with open(f'{thisdir}/../package.json') as f:
        package_json = json.load(f)
    with open(f'{thisdir}/code_generation.json') as f:
        code_generation_json = json.load(f)
    template_kwargs = {
        'projectName': package_json['name'],
        'projectNameUnderscore': package_json['name'].replace('-', '_'),
        'projectVersion': package_json['version']
    }
    for k, v in code_generation_json.items():
        template_kwargs[k] = v
    
    template_folder = f'{thisdir}/../templates'
    dest_folder = f'{thisdir}/..'
    generate(template_folder=template_folder, dest_folder=dest_folder, template_kwargs=template_kwargs)

def generate(*, template_folder: str, dest_folder: str, template_kwargs: dict):
    template_fnames = os.listdir(template_folder)
    for fname in template_fnames:
        template_path = f'{template_folder}/{fname}'
        dest_path = f'{dest_folder}/{fname}'
        if os.path.isdir(template_path):
            if not os.path.exists(dest_path):
                os.mkdir(dest_path)
            generate(template_folder=template_path, dest_folder=dest_path, template_kwargs=template_kwargs)
        elif os.path.isfile(template_path):
            with open(template_path, 'r') as f:
                template_code = f.read()
            template_stat = os.stat(template_path)
            with open(dest_path, 'r') as f:
                dest_code = f.read()
            dest_stat = os.stat(dest_path)
            t = Template(template_code, keep_trailing_newline=True)
            gen_code = t.render(**template_kwargs)
            if gen_code != dest_code:
                with open(dest_path, 'w') as f:
                    print(f'Writing {dest_path}')
                    f.write(gen_code)
            if template_stat.st_mode != dest_stat.st_mode:
                os.chmod(dest_path, template_stat.st_mode)

if __name__ == '__main__':
    main()