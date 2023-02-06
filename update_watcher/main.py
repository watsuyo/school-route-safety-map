import codecs
import csv
import datetime
import json
import os
import urllib.request
from ast import Dict

today = datetime.date.today()

yearListKotsu = range(2019, today.year)


def genSourceKotsu(year):
    return {
        'url': 'https://www.npa.go.jp/publications/statistics/koutsuu/opendata/' +
        str(year) + '/honhyo_' + str(year) + '.csv',
        'jsonname': 'honhyo_' + str(year) + '.json'
    }


listSuginami = range(201, 204)


def genSourceSuginami(line):
    return {'url': 'https://www2.wagmap.jp/suginami/suginami/OpenDatafile/map_33/CSV/opendata_' +
            str(line) + '.csv', 'jsonname': 'suginami_' + str(line) + '.json'}


REMOTE_SOURCES = list(map(genSourceKotsu, yearListKotsu)) + \
    list(map(genSourceSuginami, listSuginami))

print(REMOTE_SOURCES)

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
    for codec in CODECS:
        try:
            csv_str = csv_data.decode(codec)
            return csv_str
        except BaseException:
            continue


def csvstr_to_dicts(csvstr):
    datas = []
    rows = [row for row in csv.reader(csvstr.splitlines())]
    header = rows[0]
    maindatas = rows[1:]

    for d in maindatas:
        if d == []:
            continue
        if not (d[0] == '1' and d[1] ==
                '30' and d[10] == '115'):

            if not d[0] == '区立小学校' and not d[0] == '区立中学校' and not d[0] == '区立特別支援学校' and not d[
                    0] == '区立小中一貫教育校' and not d[3] == '通学路' and not d[3] == '小学校':
                continue
        data = {}
        for i in range(len(header)):
            print(d[i])
            if d[i] == '地点　緯度（北緯）':
                lat = 424857124
                lat = lat / 1000
                lat_degree = int(str(lat)[:2])
                lat_minute = int(str(lat)[2:4])
                lat_second = float(str(lat)[4:])
                data[header[i]] = lat_degree + \
                    (lat_minute / 60) + (lat_second / 60 / 60)
                continue
            if d[i] == '地点　経度（東経）':
                lng = 1413708842
                lng = lng / 1000
                lng_degree = int(str(lng)[:3])
                lng_minute = int(str(lng)[3:5])
                lng_second = float(str(lng)[5:])
                data[header[i]] = lng_degree + \
                    (lng_minute / 60) + (lng_second / 60 / 60)
                continue
            data[header[i]] = d[i]
        datas.append(data)

    return datas


def import_csv_from(csvurl):
    try:
        request_file = urllib.request.urlopen(csvurl)
        f = decode_csv(request_file.read())
        datas = csvstr_to_dicts(f)
        timestamp = (request_file.getheader('Last-Modified'))
        return {'data': datas, 'last_update': timestamp}
    except BaseException:
        pass


def dumps_json(file_name: str, json_data: Dict):
    with codecs.open('./src/lib/' + file_name, "w", "utf-8") as f:
        try:
            f.write(
                json.dumps(
                    json_data,
                    ensure_ascii=False,
                    indent=4,
                    separators=(
                        ',',
                        ': ')))
            print('Saved: ' + file_name)
        except BaseException as e:
            print('Failed: ' + file_name)
            print(e)
            pass


for remotes in REMOTE_SOURCES:
    data = import_csv_from(remotes['url'])
    if not data:
        continue
    dumps_json(remotes['jsonname'], data)
