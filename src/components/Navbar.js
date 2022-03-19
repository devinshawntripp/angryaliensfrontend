import logo from '../images/logo.png'
import '../App.css'
import { useSelector } from 'react-redux'

const Navbar = ({ web3Handler, account, explorerURL, admin }) => {

    const app = useSelector((state) => state.app)


    return (
        <nav className="navbar fixed-top mx-3">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0 mx-4"
                href="/"
                // target="_blank"
                // rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo" />
                Angry Aliens
            </a>
            {admin && admin === app.address && <a href="/Admin">Admin</a>}
            <a>
                DOCS
            </a>
            <a href="/Fight">
                FIGHT
            </a>
            <a href="/Nodes">
                NODES
            </a>

            {account ? (
                <a
                    href={`${explorerURL}/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button nav-button btn-sm mx-4">
                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </a>
            ) : (
                <button onClick={web3Handler} className="button nav-button btn-sm mx-4">Connect Wallet</button>
            )}
        </nav>
    )
}

export default Navbar;