import Button from '@mui/material/Button'

function SideBar() {
    const apiKey = "eb800069a59bb6c8"
    const handleReset = async () => {
        const response = await fetch(`https://nuclear.dacoder.io/reactors/reset?apiKey=${apiKey}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        const jsonResponse = await response.json()
        console.log(jsonResponse)
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
                    width: '200px',
                    height: '56px',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 700,
                    fontSize: '42px',
                    border: 3,
                    borderColor: '#FF6663',
                    borderRadius: '15px',
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
                    width: '152px',
                    borderRadius: '15px',
                    fontWeight: 700,
                    fontSize: '18.5px',
                    lineHeight: '28px',
                    color: '#BFD7EA',

                }}

            >Coolant On</Button>

            <Button variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '30px',
                    fontFamily: 'Roboto Condensed',
                    height: '68px',
                    width: '152px',
                    borderRadius: '15px',
                    fontWeight: 700,
                    fontSize: '18.5px',
                    lineHeight: '28px',
                    textAlign: 'center',
                    color: '#BFD7EA',

                }}

            >Coolant Off</Button>

        </div>
    )
}

export default SideBar