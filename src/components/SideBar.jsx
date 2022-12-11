import '/src/Home.css'
import Button from '@mui/material/Button'

function SideBar() {
    return (
        <div className="sideBar">
            <div className="logo">
                Nuclear Power Sim
            </div>
            <Button className="resetButton" variant="contained"
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