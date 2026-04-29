from ldap3 import Server, Connection, ALL, SAFE_SYNC
import os


# funcion para registrar a un usuario en un servidor ldap
def ldap_register(username, password, email, name, last_name):
    # obtenemos los datos del servidor ldap al que se va a hacer la peticion
    server_uri = os.getenv("LDAP_URI")
    admin_dn = os.getenv("LDAP_BIND_DN")
    admin_password = os.getenv("LDAP_BIND_PASSWORD")
    search_base = os.getenv("LDAP_SEARCH_BASE")

    try:
        # nos conectamos al servidor como administrador
        server = Server(server_uri, get_info=ALL)
        connection = Connection(
            server,
            user=admin_dn,
            password=admin_password,
            client_strategy=SAFE_SYNC,
            auto_bind=True,
        )
        user_dn = f"uid={username},{search_base}"

        # declaramos los atributos del nuevo usuario
        attrs = {
            "objectClass": ["top", "person", "inetOrgPerson"],
            "cn": f"{name} {last_name}",
            "sn": last_name,
            "givenName": name,
            "mail": email,
            "uid": username,
            "userPassword": password,
        }

        # registramos al nuevo usuario
        if connection.add(user_dn, attributes=attrs):
            print(f"{username} creado correctamente")
            return True
        else:
            print("Error en la creacion del usuario en el servidor ldap")
            return False
    except Exception as e:
        print(e)
        return False
