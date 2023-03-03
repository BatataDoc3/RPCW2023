
pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Arq Index</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Index</h1>
        </center>
        <table>
            <tr>
                <th>XML</th>
                <th>HTML</th>
            </tr>
        
"""

for i in range(121):
    pagWeb += f"<tr><td><a href=XML/{i}>arq{i}</a></td>\n" 
    pagWeb += f"<td><a href=HTML/{i}>arq{i}</a></td></tr>\n"

pagWeb += """
            </tr>
        </table>
    </body>
</html>

 """

f = open("index.html", "w")
f.write(pagWeb)
f.close()


