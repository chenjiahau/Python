import os
import re
import json

reg_pattern = [
    "label='[a-zA-Z0-9 ]+'",
    'label="[a-zA-Z0-9 ]+"',
    ">[a-zA-Z0-9 ]+<",
    "label='[a-zA-Z0-9 ]+'",
    'label="[a-zA-Z0-9 ]+"',
    "label: '[a-zA-Z0-9 ]+'",
    'label: "[a-zA-Z0-9 ]+"',
    "title='[a-zA-Z0-9 ]+'",
    'title="[a-zA-Z0-9 ]+"',
    "title: '[a-zA-Z0-9 ]+'",
    'title: "[a-zA-Z0-9 ]+"',
    "success='[a-zA-Z0-9 ]+'",
    'success="[a-zA-Z0-9 ]+"',
    "success: '[a-zA-Z0-9 ]+'",
    'success: "[a-zA-Z0-9 ]+"',
    "error='[a-zA-Z0-9 ]+'",
    'error="[a-zA-Z0-9 ]+"',
    "error: '[a-zA-Z0-9 ]+'",
    'error: "[a-zA-Z0-9 ]+"',
    "warning='[a-zA-Z0-9 ]+'",
    'warning="[a-zA-Z0-9 ]+"',
    "warning: '[a-zA-Z0-9 ]+'",
    'warning: "[a-zA-Z0-9 ]+"',
]


def get_js_files():
    filename_path_list = []
    for root, directories, filenames in os.walk('./pages'):
        for directory in directories:
            # directory_path = os.path.join(root, directory)
            for filename in filenames:
                if filename.endswith('.js'):
                    filename_path = os.path.join(root, filename)
                    filename_path_list.append(filename_path)

    return filename_path_list


def get_replace_str(filename_path):
    replace_str_list = []

    with open(filename_path, "r") as file:
        context = file.readlines()

        for line_number in range(len(context)):
            for i in range(len(reg_pattern)):
                g = re.search(reg_pattern[i], context[line_number])
                if g:
                    str = f"[{line_number}][{filename_path}][{g.group(0)}]"
                    replace_str_list.append(str)

    return replace_str_list


def scan_files(specified_path=None):
    replace_str_list = []

    if specified_path and filename_path == specified_path:
        replace_str_list = get_replace_str(filename_path)
    else:
        for filename_path in get_js_files():
            replace_str_list += get_replace_str(filename_path)

    return replace_str_list


def get_i18n_dictionary():
    lang_dict = {}

    for root, directories, filenames in os.walk('./i18n'):
        for directory in directories:
            file_path = os.path.join(root, directory)
            eng_file_path = f'{file_path}/ENG.json'

            with open(eng_file_path, "r") as file:
                content = json.load(file)

                for key in content.keys():
                    lang_dict[key] = content[key]

    return lang_dict


lang_dict = get_i18n_dictionary()
replace_str_list = scan_files()

duplicated_list = []
for hash_code in lang_dict:
    for replace_str in replace_str_list:
        if replace_str.find(lang_dict[hash_code]) != -1:
            duplicated_list.append(replace_str)


no_duplicated_list = list(dict.fromkeys(duplicated_list))

with open('result.txt', 'w') as f:
    for i in no_duplicated_list:
        f.write(i + '\n')
