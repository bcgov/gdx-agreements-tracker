* Project_Table   
   | Project_Code {R} | Status |
            ---
        ** Project {$projectID}
            | Project_Code {RW}{Input} | Status |




* Contract_Table
    | Project_Code |
        ---
            |Project_Code {RW}{Select}|



Load a page
    API call to get all projects        
        - When used in a list: Table Present the Project data in a filtered way (less columns)
        - When displayed on a project page: Form Present all data but with JSX (React HTML)
                 Loop through everything
                 Return(
                    <JSX defaultValue={value of that field for this project} Title="label" Name="DB field name" ifASelect={select values} layout={number}>

                    </JSX>

                    if string return <input>
                    if projectSelect return <select>
                    if date return <date>
                    
                 )