import Button from '@mui/material/Button'

const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key

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
    const { name } = props
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

                onClick={handleRename}

            >Rename</Button>
        </div>
    )
}



export default TopBar