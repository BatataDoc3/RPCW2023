import json


def ord_cidade(c):
    return c['nome']
    


f = open("mapa.json")
data = json.load(f)
#print(data.keys())
cidades = data['cidades']
ligacoes = data['ligações']
cidades.sort(key=ord_cidade)



def getListaLigacoes(origem):
    lista = []
    for l in ligacoes:
        dic = {}
        if l['origem'] == origem:
            for c in cidades:
                if c['id'] == l['destino']:
                    destino = c['nome']
                    break
            dic['id'] = l['destino']
            dic['destino'] = destino
            dic['distancia'] = l['distância']
            lista.append(dic)
    return lista
    
pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr> 
                <td width="30%" valign="top">
                    <!--- Lista com o índice-->
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ul>

"""



for c in cidades:
    pagWeb += f"""
                        <li>
                            <a href="#{c['id']}">{c['nome']}</a>
                        </li>
                        """
                        
pagWeb += """"                        
                    </ul>

                </td>
                <td width="70%">
    """
    
for c in cidades:
    pagWeb += f"""
                    <!--- Informação das cidades-->
                    <a name="{c['id']}"/>
                    <h2>{c['nome']}</h2>
                    <p><b>população:</b> {c['população']} </p>
                    <p><b>descrição:</b> {c['descrição']} </p>
                    <p><b>distrito:</b> {c['distrito']} </p>
                    """
    ligacoes_lista = getListaLigacoes(c['id'])
    if len(ligacoes_lista )!= 0:
        pagWeb += "<h3> Ligações: </h3>"
    for l in ligacoes_lista:
        pagWeb += f"""
                    <a href="#{l['id']}">{l['destino']}</a> - distância: {l['distancia']} <p>
                    """ 
                    
pagWeb += """                    
                    <address>[<a href="#indice">Voltar ao inicio</a>]
                    <center>
                        <hr width="80%"/>
                    </center>
    """
    
pagWeb += """
                </td>
            </tr>
        </table> 
    </body>
</html>
"""
    
print(pagWeb)
#cidades.sort()



"""TPC

- Para cada cidade, acrescentar a lista de ligações que essa cidade tem com a outra
Ligações
    . Nome de cidade(link) : distância
    .
    .
    .


"""