import { useEffect, useState, useContext } from 'react';
import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney } from 'react-icons/md';
import Loader from './Loader'
import { GlobalContext } from './context/GlobalState';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const AddFood = () => {
  const { addFood } = useContext(GlobalContext);

  // Const states
  const [ foodName, setFoodName ] = useState('');
  const [ foodPrice, setFoodPrice ] = useState('');
  const [imageAsset, setImageAsset] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [ errMsg, setErrMsg ] = useState('');

  // Upload image func
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    // Validate image
    if(!imageFile.type.match(imageMimeType)) {
      setErrMsg('Error uploading image')
      return;
    }
    setImageAsset(imageFile);
  }

  // UseEffect
  useEffect(() => {
    setIsLoading(false);
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
    setIsLoading(true);
    setImageAsset(null);
    setIsLoading(false);
  };

  // Save new food func
  const saveFood = () => {   
    
    try {
      if(!foodName || !foodPrice || !imageAsset ){
        setErrMsg('Fill in all fields')
        setTimeout(() => {
          setErrMsg(false)
        }, 3000);
      } else {
        setIsLoading(true);
        const newFood = {
          id: Math.floor(Math.random() * 1000) + 1,
          name: foodName,
          price: parseInt(foodPrice),
          img: "image"
        }        
        addFood(newFood);
        setIsLoading(false);
        setFoodName('');
        setImageAsset(null);
        setFoodPrice('');
      }
    } catch (err) {
      setErrMsg('something went wrong');
     }
  };

  return (
    <div className="mainAdmin">
      <div className="addFoodContainer shadow-md rounded">
        <div className="errorDiv bg-danger text-center text-white  shadow-sm rounded">
          <p className='errMsg'>{errMsg}</p>
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text bg-transparent fs-6"> 
          <MdFastfood className=''/>
          </span>
          <input type="text" className="form-control bg-transparent" placeholder="Food name" aria-label="Username" aria-describedby="basic-addon1" value={foodName} onChange={(e) => setFoodName(e.target.value)}/>
        </div>

        <div className="imageLoader shadow-lg d-flex justify-content-center align-items-center rounded mb-1">
           {isLoading ? <Loader /> : <>
              {!imageAsset ? (<>                
                <div className="fileInput flex-column  d-flex align-items-center justify-content-center rounded">
                  <label htmlFor='file' style={{cursor: 'pointer'}}>
                  <h1 className='text-center text-secondary'><MdCloudUpload /></h1>
                
                  <p className='fs-6 text-secondary'>Click here to upload</p>
                  </label>
                  <input type='file' name='uploadimage' accept="image/*" onChange={uploadImage} className='addImageInput'/>
                </div> 
                
                </>) : (<>
                  <div className='uploadedImage d-flex flex-column p-1 bg-transparent'>
                    <div className="imgCont">
                    <img src={fileDataURL} alt="" className='mt-2' />
                    </div>
                    
                    <div className="deleteImgBtn">
                    {fileDataURL && 
                    <button className='btn-danger border-0 bg-transparent ' onClick={deleteImage}><MdDelete className='text-danger'/></button>}
                    </div>
                  </div>
                </>
              )} 
           </>} 
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text bg-transparent fs-6"> 
          <MdAttachMoney />
          </span>
          <input type="text" className="form-control bg-transparent" placeholder="Price" aria-label="Username" aria-describedby="basic-addon1" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)}/>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-success p-0 btn-sm " type="button" onClick={saveFood}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddFood
