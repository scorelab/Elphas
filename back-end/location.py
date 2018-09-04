import math
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS




def _convert_to_degress(value):

    d = float(value[0][0]) / float(value[0][1])
    m = float(value[1][0]) / float(value[1][1])
    s = float(value[2][0]) / float(value[2][1])

    return d + (m / 60.0) + (s / 3600.0)

def get_exif_location(exif_data):

    loca=None

    try:
        for tag, value in exif_data.items():
            if (TAGS.get(tag, tag) == "GPSInfo"):
                loca=value
                break
    except Exception:
        return None

    try:
        gps_latitude = [loca[2][0],loca[2][1],loca[2][2]]
        gps_latitude_ref = loca[1]
        gps_longitude = [loca[4][0],loca[4][1],loca[4][2]]
        gps_longitude_ref = loca[3]
    except Exception:
        return None

    lat = _convert_to_degress(gps_latitude)
    if gps_latitude_ref != 'N':
        lat = 0 - lat

    lat = math.ceil(lat*1000000)/1000000

    lon = _convert_to_degress(gps_longitude)
    if gps_longitude_ref != 'E':
        lon = 0 - lon

    lon = math.ceil(lon*1000000)/1000000

    return lat, lon

def getLocation(img_path):
    image = Image.open(img_path)
    info = image._getexif()
    return get_exif_location(info)


