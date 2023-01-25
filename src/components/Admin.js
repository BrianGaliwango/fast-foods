import { useState, useContext, useEffect } from 'react';
import { MdFastfood, MdDelete, MdAttachMoney, MdDeleteForever, MdOutlineLibraryAdd } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import AdminOrderedFoods from './AdminOrderedFoods';
import { GlobalContext } from './context/GlobalState';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Admin = () => {

  const { saveEditedFood, saveEditedFoodImage } = useContext(GlobalContext);

  const {foods, deleteFood,cart } = useContext(GlobalContext);
  const [showMenu, setShowMenu] = useState(true);
  const [editFood, setEditFood] = useState(false);

  const [ foodName, setFoodName ] = useState('');
  const [ foodPrice, setFoodPrice ] = useState('');
  const [ foodId, setFoodId ] = useState('');
  const [editImageAsset, setEditImageAsset] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [ errMsg, setErrMsg ] = useState('');

   // Get edit food func
   const getFood = (food) => {
    setEditFood(!editFood);
    setFoodName(food.name);
    setFoodPrice(food.price);
    setEditImageAsset(food.img);
    setFoodId(food.id);
  }

  // Upload image func
  const uploadImage = (e) => {
    const imageFile = e.target.files[0];

    // Validate image
    if(!imageFile.type.match(imageMimeType)) {
      setErrMsg('Error uploading image')
      setTimeout(() => {setErrMsg('')}, 2000);
      return;
    }
    setImageAsset(imageFile);
  }

  // UseEffect
  useEffect(() => {
    let fileReader, isCancel = false;
    if (imageAsset) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(imageAsset)
    }
    return () => {
      isCancel = true;
      if(fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  },[imageAsset]);


   // Delete image func
   const deleteImage = () => {
    setImageAsset(!imageAsset);
    setImageAsset(null);    
  };

  // Save edited details
  const saveDetails = () => {

    if(!foodName || !foodPrice){
      setErrMsg("Fill in fields")
      setTimeout(() => {setErrMsg(!errMsg)}, 3000);
    } else {
      setEditFood(false)

      // Init editedFood
      const editedFood = {
        id: foodId,
        name: foodName,
        price: parseInt(foodPrice),
      }
      saveEditedFood(editedFood)
    }     
  }

  // Save image func
  const saveImage = () => {

    if(imageAsset) {
      setEditFood(!editFood);
      const newImage = {
        id: foodId,
        img: 'saved'
      }

      saveEditedFoodImage(newImage);
      setImageAsset(null);

    }
  }

  // Cancel edit mode
  const cancelEditMode = () => {
    setEditFood(false);
    setImageAsset(null);
  };

  return (
    <><div className='mainAdmin'>  
    {showMenu ? <>
      <>
      <div className="mainAdmin">
            <div className="menuContainer">
            {/* Menu */}
            <div className="adminMenuHeaderContent shadow-sm rounded">
            <h6 className='adminMenuHeader mb-0'>Menu</h6> 
              <div className="d-flex">              
                <Link to="/AddFood" className='adminOrdersBtn text-dark btn btn-outline-success border-0 shadow-sm '><MdOutlineLibraryAdd/></Link>  
              </div>
              <div className="d-flex">
               <span className='mx-1 text-primary'>{cart.length}</span> 
              <button className='adminOrdersBtn text-dark btn btn-outline-success border-0 shadow-sm ' onClick={() => setShowMenu(false)}>orders</button>
              </div>              
            </div>  

            <div className="menuFoodList ">
              <ul className="list-group mb-2">
                {foods.map(food => (<li key={food.id} className="list-group-item p-1 menuFood">
            {food.name} 
              <span>
                <button className="viewFood" onClick={() => getFood(food)}><TbEdit/></button>
                <button className="deleteFood text-danger" onClick={() => deleteFood(food.id)}><MdDeleteForever/></button>
              </span>     
          </li> ))}
              </ul>
            </div>
            </div>
      </div>
    </>
      {editFood && <>   
      {/* Edit mode */}
      <div className="topDiv d-flex  bg-body p-2 text-dark bg-opacity-50 justify-content-center">
        <div  className="viewedFoodContainer bg-warning rounded">
          <div className="addFoodContainer shadow-md rounded">
            <div className="errorDiv bg-danger text-center text-white  shadow-sm rounded">
              <p className='errMsg'>{errMsg}</p>
            </div>
            
            <div className="imageLoader shadow-lg d-flex justify-content-center align-items-center rounded mb-1">

              {!imageAsset ? (<>
                
                <><div className="input-group mb-1">
              <span className="input-group-text bg-transparent fs-6"> 
              <MdFastfood className=''/>
              </span>
              <input type="text" className="form-control bg-transparent " placeholder="Food name" aria-label="Username" aria-describedby="basic-addon1" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
            </div>

            <div className="input-group mb-1">
                <span className="input-group-text bg-transparent fs-6"> 
                <MdAttachMoney />
                </span>
                <input type="text" className="form-control bg-transparent" placeholder="Price" aria-label="Username" aria-describedby="basic-addon1" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)}/>
                
            </div>
            </>
              <div className="fileInput flex-column d-flex align-items-center justify-content-center rounded">   
                <div className="imgDiv bg-success mt-2 flex-column align-items-center d-flex justify-content-center ">   
                  <span className=''>{editImageAsset}</span>                          
                </div> 
                <button className='btn btn-sm btn-outline-primary mt-1 mb-1 border-0 changeImageBtn'>
                  <input type='file' name='uploadimage' className='editImageInput' accept="image/*" onChange={uploadImage} />
                    <CgArrowsExchangeAlt />Change
                </button>                   
              </div>

              </>) : (<>
                <div className='uploadedImage d-flex flex-column p-1 bg-transparent'>
                    <img src={fileDataURL} alt="" className='mt-2' />
                    {fileDataURL && 
                    <button className='btn-danger border-0 bg-transparent' onClick={deleteImage}>
                      <MdDelete className='text-danger'/>
                    </button>}
                </div>

              </>)}
      
            </div>
          
            <div className="mt-1 proceedBtnCont">
                {!imageAsset ? <>
                  <button className="btn btn-outline-success btn-sm" type="button" onClick={saveDetails}>save</button> 
                </> : <>
                  <button className="btn btn-outline-success btn-sm" type="button" onClick={saveImage}>save image</button>  
                </> }
                
                <button className="btn btn-sm btn-outline-danger p-1" onClick={cancelEditMode}>cancel</button> 
            </div> 
          </div>
        </div>
      </div>
      </>}  
    </> : <>
      <div className='position-fixed adminOrdersHeaderContent shadow-sm'>
          <h6 className='adminOrdersHeader mb-0'> <span className='mx-1 text-primary'>{cart.length}</span>Orders</h6>
          <button className='ordersBtn text-dark btn btn-outline-success border-0 shadow-sm' onClick={() => setShowMenu(!showMenu)}>Menu</button>
        </div>
      <div className="adminOrdersContainer">      
        <div className="adminOrderedFoods">     
          <AdminOrderedFoods />
        </div>
      </div> 
    </>}      
    </div>
    
    </>
    
  )
}

export default Admin