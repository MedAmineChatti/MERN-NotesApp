import axios from 'axios';
import React,{useState} from 'react';

export default function CreateNotes() {
    const [note, setNote] =  useState({
        title:"title",
        content: "content",
        date:"12/12/2002"
    })



    const saveNote = (token) => {
        axios
          .post("http://localhost:5000/api/note/",{
            headers:{Authorization: token}
          })
    }

    return (
        <div>
            <h2>
                Create Notes 
                <form>
                    <div className="row">
                        <label htmlFor="title">
                            Title :
                        </label>
                        <input type="text" value={note.title} id="title" name="title" required/>            
                    </div>
                    <div className="row">
                        <label htmlFor="content">
                            Content :
                        </label>
                        <textarea type="text" value={note.content} id="content" name="content" required rows=""/>            
                    </div>
                    <div className="row">
                        <label htmlFor="date">
                            Date :
                        </label>
                        <input type="date" value={note.date} id="date" name="date" required/>            
                    </div>

                    <div className="row">
                       <button type="submit" onClick={saveNote()}>Save Your Note</button>            
                    </div>
                </form>
            </h2>
        </div>
    )
}
