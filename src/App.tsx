import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState({
    ProductName: '',
    Email: "",
    Price: "",
    Quantity: "",
    City: "",
    State: "",
    ZipCode: "",
  })

  const [tableEntry, setTableEntry] = useState([]);
  const [editEnable, setEditEnable] = useState<number | null>(null);
  const [itr, setItr] = useState<number | null>(null);

  const getFormValues = (event: any, name: string) => {
    let oldVal = { ...data };
    oldVal[name] = event;

    setData(oldVal)
    // setData((prev)=> {...prev, [name]: event})
  }

  const addEntryToTable = () => {
    
    if (editEnable === null) {

      let oldTableData = [...tableEntry];
      oldTableData.push(data)
      localStorage.setItem("Products", JSON.stringify(oldTableData))
      setTableEntry(oldTableData);
      setEditEnable(false)
    } else {
      let oldtableData = [...tableEntry];

      oldtableData[editEnable] = data;

      setTableEntry(oldtableData)

    }
    setData({
      ProductName: '',
      Email: "",
      Price: "",
      Quantity: "",
      City: "",
      State: "",
      ZipCode: "",
    })
    setEditEnable(null)


  }

  useEffect(() => {
    let savedItems: any[] = localStorage.getItem("Products")
    if (JSON.parse(savedItems)) {
      setTableEntry(JSON.parse(savedItems))
    }
  }, [])

  const deleteEntry = (index: number) => {
    let oldData = [...tableEntry];

    let removedItem = oldData.filter((_, ind) => { return ind !== index })

    setTableEntry(removedItem)
  }

  const editEntry = (index: number, iterator: any) => {
    setEditEnable(index)
    setItr(iterator)
    let oldVals = { ...iterator }
    // setEditEnable(index)
    setData(oldVals)
  }
  const saveEntry = (index: number) => {

    setEditEnable(null);
  }

  const getEditedData = (value: string, index: number, iterator: any, name: string) => {
    let oldVals = { ...iterator }
    let oldData = [...tableEntry];

    oldVals[name] = value;
    oldData[index] = oldVals;
    localStorage.setItem('Products', JSON.stringify(oldData))
    setTableEntry(oldData)

  }

  return (
    <>
      <div >
        <label>Product name <span className='Mandatory'>*</span></label> 
        <input value={data.ProductName} onChange={(e) => getFormValues(e.target.value, "ProductName")} name='ProductName' placeholder='Product name' type='text' />
      </div>
      <div >
        <label>Email <span className='Mandatory'>*</span></label>
        <input value={data.Email} onChange={(e) => getFormValues(e.target.value, "Email")} name='Email' placeholder='test@email.com' type='text' />
      </div>
      <div >

        <div className='marginRight5'>
          <label>Price </label>
          <input value={data.Price} onChange={(e) => getFormValues(e.target.value, "Price")} name='Price' placeholder='Price' type='text' />
        </div>
        <div className='marginRight5'>
          <label>Quantity </label>
          <input value={data.Quantity} onChange={(e) => getFormValues(e.target.value, "Quantity")} name='Quantity' placeholder='Quantity' type='text' />
        </div>
      </div>

      <div >
        <div>
          <label>City </label>
          <input value={data.City} onChange={(e) => getFormValues(e.target.value, "City")} name='City' placeholder='City' type='text' />
        </div>
        <div>
          <label> State </label>
          <select name='State'>
            <option value={0} hidden>Select state</option>
            <option selected={data.State === "Maharashtra"} value={"Maharashtra"} >Maharashtra</option>
            <option selected={data.State === "Delhi"} value={"Delhi"}>Delhi</option>
            <option selected={data.State === "Gujrat"} value={"Gujrat"}>Gujrat</option>
          </select>
          {/* <label>State </label>
          <input onChange={(e)=>getFormValues(e.target.value, "ProductName")} placeholder='State' type='text' /> */}
        </div>
        <div>
          <label>Zip code</label>
          <input value={data.ZipCode} onChange={(e) => getFormValues(e.target.value, "ZipCode")} name='ZipCode' placeholder='Zip code' type='text' />
        </div>
      </div>
      <button onClick={addEntryToTable} type='submit'>{editEnable === null ? "Place Order" : "Save"}</button>

      <div style={{ justifyContent: 'center', alignItems: "center" }}>
        <h4>Table Entry</h4>
      </div>

      <div style={{ marginTop: "5px" }}>
        <table>
          <tr>
            <th>Product name</th>
            <th>Email</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Action</th>
          </tr>
          {
            tableEntry?.length > 0 && tableEntry.map((itr: any, index: number) => (
              <tr key={index}>
                {/* <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "ProductName")} disabled={editEnable !== index} value={itr.ProductName} /></td>
                <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "Email")} disabled={editEnable !== index} value={itr.Email} /></td>
                <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "Price")} disabled={editEnable !== index} value={itr.Price} /></td>
                <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "Quantity")} disabled={editEnable !== index} value={itr.Quantity} /></td>
                <td style={{ maxWidth: "10px" }}>Total Amt</td>
                <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "City")} disabled={editEnable !== index} value={itr.City} /></td>
                <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "State")} disabled={editEnable !== index} value={itr.State} /></td>
                <td style={{ maxWidth: "10px" }}><input onChange={(e) => getEditedData(e.target.value, index, itr, "Zin")} disabled={editEnable !== index} value={itr.Zip} /></td> */}

                <td>{itr.ProductName}</td>
                <td>{itr.Email}</td>
                <td>{itr.Price}</td>
                <td>{itr.Quantity}</td>
                <td>Total Amt</td>
                <td>{itr.City}</td>
                <td>{itr.State}</td>
                <td>{itr.Zip}</td>

                <td >
                  <button onClick={() => editEntry(index, itr)}> Edit</button>
                  <button onClick={() => deleteEntry(index)}>Delete</button>
                </td>
              </tr>
            )
            )
          }
        </table>
      </div>
    </>
  )
}

export default App
