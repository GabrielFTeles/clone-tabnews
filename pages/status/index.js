import useSWR from "swr";

async function fetchAPI(key) {
    const response = await fetch(key);
    const responseBody = await response.json();
    return responseBody;
}

function StatusPage() {
    return (
        <>
            <h1>Status</h1>
            <UpdatedAt />
            <DatabaseInfo />
        </>
    );
}

function UpdatedAt() {
    const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000,
    });

    let updatedAtText = "Carregando...";

    if (!isLoading && data) {
        updatedAtText = new Date(data.updated_at).toLocaleString("pt-Br");
    }

    return (
        <div>
            <strong>Última atualização</strong>: {updatedAtText}
        </div>
    );
}

function DatabaseInfo() {
    const { data } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000,
    });

    const placeholderText = "Carregando...";

    const databaseInfo = data?.dependencies?.database;

    return (
        <div>
            <h2>Banco de Dados</h2>
            <p>
                <strong>Versão: </strong>
                {databaseInfo?.version ?? placeholderText}
            </p>
            <p>
                <strong>Conexões máximas: </strong>
                {databaseInfo?.max_connections ?? placeholderText}
            </p>
            <p>
                <strong>Conexões abertas: </strong>
                {databaseInfo?.opened_connections ?? placeholderText}
            </p>
        </div>
    );
}

export default StatusPage;
