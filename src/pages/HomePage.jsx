import {useEffect, useState} from "react";
import {supabase} from "../client.js";
import "../App.css"


const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        name: "",
        age: ""
    });

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const {data} = await supabase.from("users").select("*");
        setUsers(data);
    }

    function handleChange(e) {
        setUser(prevFormDate => {
            return {...prevFormDate, [e.target.name]: e.target.value};
        })
    }

    async function createUser(e) {
        e.preventDefault();
        await supabase.from("users").insert({name: user.name, age: user.age});
        fetchUsers()
    }

    async function deleteUser(id) {
        const {data, error} = await supabase.from("users").delete().eq('id', id);
        fetchUsers()
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }

    }

    return (
        <div className="createClient">

            <form onSubmit={createUser}>
                <input type="text" placeholder="User-name" name="name" onChange={handleChange}/>
                <input type="number" placeholder="User-age" name="age" onChange={handleChange}/>
                <button type="submit">Create User</button>
            </form>

            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }

                </tbody>
            </table>
        </div>
    );
};

export default HomePage;