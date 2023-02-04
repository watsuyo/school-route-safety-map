import datetime
from ast import Dict
import codecs
import csv
import json
import os
import urllib.request

year = 2019

REMOTE_SOURCES = [
    {
        'url': 'https://www.npa.go.jp/publications/statistics/koutsuu/opendata/' + str(year) + '/honhyo_' + str(year) + '.csv',
        'jsonname': 'honhyo_' + str(year) + '.json',
    },
]


JST = datetime.timezone(datetime.timedelta(hours=+9), 'JST')

CODECS = [
    'utf-8',
    'cp932',
    'shift_jis',
    'euc_jp',
    'euc_jis_2004',
    'euc_jisx0213',
    'iso2022_jp',
    'iso2022_jp_1',
    'iso2022_jp_2',
    'iso2022_jp_2004',
    'iso2022_jp_3',
    'iso2022_jp_ext',
    'shift_jis_2004',
    'shift_jisx0213',
    'utf_16',
    'utf_16_be',
    'utf_16_le',
    'utf_7',
    'utf_8_sig']

os.makedirs('./data', exist_ok=True)


def decode_csv(csv_data):
    print('csv decoding')
    for codec in CODECS:
        try:
            csv_str = csv_data.decode(codec)
            print('ok:' + codec)
            return csv_str
        except BaseException:
            print('ng:' + codec)
            continue
    print('Appropriate codec is not found.')


def csvstr_to_dicts(csvstr):
    datas = []
    rows = [row for row in csv.reader(csvstr.splitlines())]
    header = rows[0]

    maindatas = rows[1:]
    for d in maindatas:
        if d == []:
            continue
        if not (d[0] == '1' and d[1] == '30'):
            continue
        data = {}
        for i in range(len(header)):
            data[header[i]] = d[i]
        datas.append(data)
    return datas


def import_csv_from(csvurl):
    request_file = urllib.request.urlopen(csvurl)
    if not request_file.getcode() == 200:
        return

    f = decode_csv(request_file.read())
    datas = csvstr_to_dicts(f)
    timestamp = (request_file.getheader('Last-Modified'))
    return {'data': datas, 'last_update': timestamp}


def dumps_json(file_name: str, json_data: Dict):
    with codecs.open('./public/' + file_name, "w", "utf-8") as f:
        f.write(
            json.dumps(
                json_data,
                ensure_ascii=False,
                indent=4,
                separators=(
                    ',',
                    ': ')))

for remotes in REMOTE_SOURCES:
    data = import_csv_from(remotes['url'])
    dumps_json(remotes['jsonname'], data)
