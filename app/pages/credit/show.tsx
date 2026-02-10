export function Show({creditId, details}: {creditId: string; details: any}) {

    return (
        <div className="text-white text-2xl">
            <h1>Credit Details</h1>
            <p>Name: {details.department}</p>
            <p>Job: {details.job}</p>
            <p>Credit Type: {details.credit_type}</p>
        </div>
    )
}