import Button from '@mui/material/Button'

function SideBar(props) {
    const { reactors } = props
    const apiKey = "eb800069a59bb6c8"
    const handleReset = async () => {
        const response = await fetch(`https://nuclear.dacoder.io/reactors/reset?apiKey=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }

            })


        const jsonResponse = await response.json()

        console.log(jsonResponse)

    }
    const handleCoolantOnAll = async () => {
        for (let reactor of reactors) {
            const coolantResponse = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        coolant: "on"
                    })
                }
            )
            const jsonCoolantResponse = await coolantResponse.json()
            console.log(jsonCoolantResponse)
        }
    }

    const handleCoolantOffAll = async () => {
        const responseToAwaits = reactors.map(async reactor => {
            const response = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        coolant: "off"
                    })
                }
            )
            const jsonResponse = await response.json()
            console.log(jsonResponse)
        })

        await Promise.all(responseToAwaits)
    }


    return (
        <div className="sideBar">
            <div className="logo">
                Nuclear Power Sim
            </div>
            <Button className="resetButton"
                variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '50px',
                    color: '#E0FF4F',
                    width: '80%',
                    height: '56px',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 700,
                    fontSize: '3vw',
                    border: 3,
                    borderColor: '#FF6663',
                    borderRadius: '15px',
                    overflow: 'hidden',
                }}
                onClick={handleReset}

            >RESET</Button>
            <div className='divider'></div>

            <Button variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '30px',
                    fontFamily: 'Roboto Condensed',
                    height: '68px',
                    width: '70%',
                    borderRadius: '15px',
                    fontWeight: 700,
                    fontSize: '1.5vw',
                    lineHeight: '20px',
                    color: '#BFD7EA',
                    overflow: 'hidden',
                }}
                onClick={handleCoolantOnAll}

            >Coolant On</Button>

            <Button variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '30px',
                    fontFamily: 'Roboto Condensed',
                    height: '68px',
                    width: '70%',
                    borderRadius: '15px',
                    fontWeight: 700,
                    fontSize: '1.5vw',
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#BFD7EA',
                    overflow: 'hidden',
                }}
                onClick={handleCoolantOffAll}

            >Coolant Off</Button>

        </div>
    )
}

export default SideBar