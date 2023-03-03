from bs4 import BeautifulSoup
f = open("arq.xml")


soup = BeautifulSoup(f, "lxml-xml", from_encoding="utf-8")
elems = soup.find_all('ARQELEM')

for i, e in enumerate(elems):
    j = open(f"out/xml/arq{i}.xml", "w")
    j.write('<?xml version="1.0" encoding="utf-8"?>\n')
    j.write(str(e))