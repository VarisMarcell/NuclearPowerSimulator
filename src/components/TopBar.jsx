import Button from '@mui/material/Button'

const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key


const handleShutdownAll = async (reactors) => {
    for (let reactor of reactors) {
        const response = await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${reactor.id}?apiKey=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }
        )
        const jsonResponse = await response.json()
        console.log(jsonResponse)
    }
}

const handleEmergencyAll = async (reactors) => {
    for (let reactor of reactors) {
        const response = await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${reactor.id}?apiKey=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }
        )
        const jsonResponse = await response.json()
        console.log(jsonResponse)
    }
}


const handleRename = async () => {
    const newPlantName = prompt("What would you like to Change the Plant Name to?")
    const response = await fetch(`https://nuclear.dacoder.io/reactors/plant-name?apiKey=${apiKey}`,
        {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newPlantName
            })
        }
    )
    const jsonResponse = await response.json()
    console.log(jsonResponse)

}
function TopBar(props) {
    const { name, reactors } = props
    return (
        <div className='topBar'>
            <div className='name'>

                <h1 className='nameText' >{name}</h1>
                <span className="nameUnderline"></span>
            </div>
            <Button className="resetButton"
                variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '10px',
                    marginLeft: '20px',
                    color: '#E0FF4F',
                    width: '200px',
                    height: '56px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 700,
                    fontSize: '42px',
                    border: 3,
                    borderColor: '#FF6663',
                    borderRadius: '15px',
                }}

                onClick={handleRename}

            >Rename</Button>

            <Button className="resetButton"
                variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '10px',
                    marginLeft: '480px',
                    marginRight: 'auto',
                    color: '#E0FF4F',
                    width: '200px',
                    height: '56px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '20px',
                    border: 3,
                    borderColor: '#FF6663',
                    borderRadius: '15px',
                }}

                onClick={() => handleShutdownAll(reactors)}

            >Controlled Shutdown</Button>

            <Button className="resetButton"
                variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '-104px',
                    marginLeft: '875px',
                    color: '#E0FF4F',
                    width: '200px',
                    height: '56px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '20px',
                    border: 3,
                    borderColor: '#FF6663',
                    borderRadius: '15px',
                }}

                onClick={() => handleEmergencyAll(reactors)}

            >Emergency Shutdown</Button>

                
        </div>
    )
}



export default TopBar