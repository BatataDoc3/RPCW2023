from bs4 import BeautifulSoup
f = open("arq.xml")


soup = BeautifulSoup(f, "lxml-xml", from_encoding="utf-8")
elems = soup.find_all('ARQELEM')

def create_html(e, i):
    pagWeb = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Arq</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>{e.IDENTI}</h1>
        <ul>
            <li> <b>Descrição</b>: {e.DESCRI} </li>
            <li> <b>Freguesia</b>: {e.FREGUE} </li>
            <li> <b>Concelho</b>: {e.CONCEL} </li>
            <li> <b>Codadm</b>: {e.CODADM} </li>
            <li> <b>Latitude</b>: {e.LATITU} </li>
            <li> <b>Longitude</b>: {e.LONGIT} </li>
            <li> <b>Altitude</b>: {e.ALTITU} </li>
            <li> <b>Acesso</b>: {e.ACESSO} </li>
        </ul>"""
    if e.find('QUADRO') is not None:
        pagWeb += f"<h2>Quadro</h2>{e.QUADRO}"

    if e.find('TRAARQ') is not None:
        pagWeb += f"<h2>Traarq</h2>{e.TRAARQ}"

    if e.find('DESARQ') is not None:
        pagWeb += f"<h2>Desarq</h2>{e.DESARQ}"

    pagWeb += f"""
        <ul>
            <li> <b>Interp</b>: {e.INTERP}</li>
            <li> <b>Bibliografia</b>: <ul>
        """
    biblios = e.find_all('BIBLIO')
    for b in biblios:
        pagWeb += f"<li>{b}</li>"
        
    pagWeb += f""" </ul></li>
            <li> <b>Autor</b>: {e.AUTOR}</li>
            <li> <b>Data</b>: {e.DATA}</li>
        </ul> 
    </body>
</html>
        
"""
    f = open(f"out/html/arq{i}.html", "w")
    f.write(pagWeb)
    f.close()

for i, e in enumerate(elems):
    create_html(e, i)