import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Offcanvas, Row } from 'react-bootstrap';
import ajax from '../../Services/fechServices';
import { useLoading } from '../../Context/LoadingContext';
import ADNavbar from '../Components/NavBar/ADNavbar';
import OffCanvasCreateCPU from '../Components/OffCanvas/OffCanvasCreateCPU';
import './EditProductAdmin.scss'
import OffCanvasCreateRAM from '../Components/OffCanvas/OffCanvasCreateRAM';
import OffCanvasCreateStorage from '../Components/OffCanvas/OffCanvasCreateStorage';
import OffCanvasCreateSCREEN from '../Components/OffCanvas/OffCanvasCreateSCREEN';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import AddCategory from './AddCategory';



export default function EditProductAdmin() {

    const loading = useLoading()
    const [optBrands, setOptBrands] = useState([])
    //optCategory là danh sách Category
    const [optCategory, setOptCategory] = useState([])
    const [chooseCategory, setChooseCategory] = useState('')
    const [optCPUs, setOptCPUs] = useState([])
    const [optScreen, setOptScreens] = useState([])
    const [optRams, setOptRams] = useState([])
    const [optStorages, setOptStorages] = useState([])
    const productId = window.location.href.split("/admin/product/create/")[1]
    const [file, setFile] = useState('');
    const [previewFile, setPreviewFile] = useState('');
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Do component này dùng cả cho trang edit lẫn Create nên cần tạo state ban đầu tất cả thuộc tính
    // Nếu chỉ trang edit thôi thì không cần.
    // Lưu ý, các trường trống không nên để null, vì trong thẻ select sẽ không chấp nhận value = null
    const [editProduct, setEditProduct] = useState({
        id: '',
        amortization: '',
        brand: '',
        camera: "",
        cpu: '',
        description: '',
        display: '',
        feature: '',
        graphic: '',
        material: '',
        model: '',
        new_price: '',
        original_price: '',
        os: '',
        pin: '',
        ram: '',

        release_date: '',
        remainSlot: '',
        screen: '',
        origin: '',
        size: '',
        slot: '',
        storage: '',
        video: '',
        warranty: '',
        weight: ''
    })
   
    useEffect(() => {
        if (Number(productId)) {
            ajax(`/api/products/product/${productId}`, "GET")
                .then(async (productResponse) => {
                    const data = await productResponse.json();
                    setEditProduct(data)
                    setFile(data.image)
                    // setFile(new Blob([JSON.stringify(data.image)],{type:'image/jpeg'}))

                    setChooseCategory(data.brand.category.code)
                    handleGetBrands(data.brand.category.code)


                }).catch(error => {
                    console.log(error);
                })
        } else {
            setOptBrands('')
            setOptCPUs('')
            setOptRams('')
            setOptStorages('')
            setOptScreens('')
            loading.setIsLoading(false)
        }


    }, [])

    const handleGetBrands = (code) => {
        ajax(`/categories/${code}`, 'GET').then(async response => {

            let result = await response.json()

            setOptBrands(result.brands)
            setOptCPUs(result.cpus)
            setOptRams(result.rams)
            setOptStorages(result.storages)
            setOptScreens(result.screens)
            loading.setIsLoading(false)
        })
    }

    const handleCreateProduct = async () => {
        
        if(file && editProduct.cpu && editProduct.ram && editProduct.storage && editProduct.screen){
        const formData = new FormData();
        
           
        formData.append('file', file)    
        

        formData.append('product', JSON.stringify(editProduct))
        
        fetch('/api/products/createOne', {
            method: 'post',
            body: formData,

            headers: {
                'Authorization': `Bearer ${loading.jwt}`,

            }

        }).then(async res => {
            if(res.ok){
             
                navigate('/admin/product')
            }
            let result = (await res.json())
            alert(result.message)
        });
    }else{
        alert('Image, CPU, RAM, Storage và Screen không được để trống!')
    }
 
    }
    const onInputChange = e => {
        let { name, value } = e.target;
        if(name === 'original_price' || name === 'new_price') value = value*1000
        setEditProduct(prev => ({
            ...prev,
            [name]: value
        }));

    }
    const onJsonChange = e => {
        const { name, value } = e.target;


        setEditProduct(prev => ({
            ...prev,
            [name]: JSON.parse(value)
        }));

    }
    useEffect(() => {
        ajax('/categories/getAllCategory').then(async response => {
            let result = await response.json()
            setOptCategory(result)
        })
    }, [])

    return (

        <>
            <ADNavbar />





            <Container fluid className='editProduct'>
                <Row className='editProduct__header'>Thông Tin Chung</Row>
                <Form as={Row} className='editProduct__body'>
                    <Form.Group as={Col} xs={3} md={2}>
                        <Form.Label>Category*</Form.Label>
                        <Form.Select
                            key='category'
                            name='category'
                            value={chooseCategory ? chooseCategory : ''}
                            onChange={(e) => {
                                if (e.target.value !== 'new') {

                                    setChooseCategory(e.target.value)


                                    handleGetBrands(e.target.value)
                                } else {
                                    handleShow()
                                }


                            }}
                        >
                            <option></option>
                            {optCategory.length ? optCategory.map(item => <option key={item.code} value={item.code}>{item.name}</option>) : <></>}


                            <AddCategory show={show} handleClose={handleClose} handleGetBrands={handleGetBrands}
                                setOptCategory={setOptCategory} optCategory={optCategory}
                                editProduct={editProduct} setChooseCategory={setChooseCategory} />

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={3} md={2}>
                        <Form.Label>Brand*</Form.Label>
                        <Form.Select
                            key='brand'
                            name='brand'
                            value={editProduct.brand ? JSON.stringify(editProduct.brand) : ''}
                            onChange={(e) => {

                                onJsonChange(e)
                            }}
                        >
                            <option></option>
                            {optBrands ? optBrands.map(item => {

                                return <option key={item.name} value={JSON.stringify(item)}>{item.name}</option>
                            }) : <></>}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={3}>
                        <Form.Label>OS</Form.Label>
                        <Form.Control type='text' value={editProduct.os? editProduct.os: ''}
                            name='os'
                            onChange={(e) => {
                                onInputChange(e)
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Original Price*</Form.Label>
                        <InputGroup>
                            <Input type="number"
                                value={editProduct.original_price ? editProduct.original_price /1000: ''}
                              
                                name='original_price'
                                onChange={(e) => {
                                    onInputChange(e)
                                }}
                            />
                            <InputGroupText >
                                ,000 đ
                            </InputGroupText>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>New Price*</Form.Label>
                        <InputGroup>
                            <Input type="number"

                                value={editProduct.new_price ? editProduct.new_price /1000 : ''}
                               
                                name='new_price'
                                onChange={(e) => {
                                    onInputChange(e)
                                }}

                            />
                            <InputGroupText>
                                ,000 đ
                            </InputGroupText>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={1}>
                        <Form.Label>Hiển thị*</Form.Label>
                        <Form.Select
                            value={editProduct.display ? editProduct.display : ''}
                            name='display'
                            onChange={(e) => {
                                onInputChange(e)
                            }}
                        >
                            <option></option>

                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={2}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type='text' value={editProduct.weight ? editProduct.weight : 0}
                            name='weight'
                            
                            onChange={(e) => {
                                onInputChange(e)
                            }}
                            
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} xs={3} md={2}>
                        <Form.Label>Size</Form.Label>
                        <Form.Control type='text' value={editProduct.size ? editProduct.size : 0}
                            name='size'
                            onChange={(e) => {
                                onInputChange(e)
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Warranty</Form.Label>
                        <Form.Control type='number' value={editProduct.warranty ? editProduct.warranty : 0}
                            name='warranty'
                            onChange={(e) => {
                                onInputChange(e)
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Model*</Form.Label>
                        <Form.Control type='text' value={editProduct.model? editProduct.model : ''}
                            name='model'
                            onChange={(e) => {
                                onInputChange(e)
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Date Release</Form.Label>

                        <Form.Control type="date"


                            value={editProduct.release_date}
                            name='release_date'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Trả góp*</Form.Label>
                        <Form.Select
                            value={editProduct.amortization !== '' ? editProduct.amortization : ''}
                            name='amortization'
                            onChange={(e) => {
                                onInputChange(e)
                            }}
                        >
                            <option></option>

                            <option value={true}>Support</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Slot</Form.Label>
                        <Form.Control type='number' value={editProduct.slot ? editProduct.slot : 0}
                            name='slot'
                            onChange={(e) => {
                                onInputChange(e)
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Form.Label>Slot Remains</Form.Label>
                        <Form.Control type='number' value={editProduct.remainSlot ? editProduct.remainSlot :0}
                            name='remainSlot'
                            onChange={(e) => {
                                onInputChange(e)
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={4}>
                        <Form.Label>Origin</Form.Label>
                        <Form.Control type='text' value={editProduct.origin ? editProduct.origin : ''}
                            name='origin'
                            onChange={(e) => {
                                onInputChange(e)
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={4}>
                        <Form.Label>Pin</Form.Label>
                        <Form.Control type='text' value={editProduct.pin ? editProduct.pin : ''}
                            name='pin'
                            onChange={(e) => {
                                onInputChange(e)
                            }}></Form.Control>
                    </Form.Group>

                </Form>
                <Row className='editProduct__header'>Linh Kiện</Row>
                <Form as={Row} className='editProduct__body'>

                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label>CPU</Form.Label>
                        <Row className='editProduct__body__grp' >
                            <Form.Select
                                key={`cpu`}
                                className='editProduct__body__grp__select'
                                value={editProduct.cpu ? JSON.stringify(editProduct.cpu) : ''}
                                xs={8}
                                name='cpu'
                                onChange={(e) => {

                                    onJsonChange(e)
                                }}
                            >
                                <option></option>
                                {optCPUs ? optCPUs.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.brand + ' ' + item.version + ' ' + item.type}</option>) : <></>}


                            </Form.Select>
                            <OffCanvasCreateCPU />

                        </Row>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label>RAM</Form.Label>
                        <Row className='editProduct__body__grp' >
                            <Form.Select
                                key={`ram`}
                                className='editProduct__body__grp__select'
                                value={editProduct.ram ? JSON.stringify(editProduct.ram) : ''}
                                xs={8}
                                name='ram'
                                onChange={(e) => {

                                    onJsonChange(e)
                                }}
                            >
                                <option></option>
                                {optRams ? optRams.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.type + ' ' + item.storage + ' GB ' + item.speed + ' MHz'}</option>) : <></>}

                            </Form.Select>
                            <OffCanvasCreateRAM />
                        </Row>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label>Storage</Form.Label>
                        <Row className='editProduct__body__grp' >
                            <Form.Select
                                key={`storage`}
                                className='editProduct__body__grp__select'
                                value={editProduct.storage ? JSON.stringify(editProduct.storage) : ''}
                                xs={8}
                                name='storage'
                                onChange={(e) => {

                                    onJsonChange(e)
                                }}
                            >
                                <option></option>
                                {optStorages ? optStorages.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.type + ' ' + item.code + ' ' + item.storage} {item.supportOptane ? ' Optane' : ''}</option>) : <></>}


                            </Form.Select>
                            <OffCanvasCreateStorage />
                        </Row>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label>Screen</Form.Label>
                        <Row className='editProduct__body__grp' >
                            <Form.Select
                                key={`screen`}
                                className='editProduct__body__grp__select'
                                value={editProduct.screen ? JSON.stringify(editProduct.screen) : ''}
                                xs={8}
                                name='screen'
                                onChange={(e) => {

                                    onJsonChange(e)
                                }}
                            >
                                <option></option>
                                {optScreen ? optScreen.map(item => <option key={item.id} value={JSON.stringify(item)}> {item.tech + ' ' + item.standard + ' ' + item.size + ' inch '}</option>) : <></>}


                            </Form.Select>
                            <OffCanvasCreateSCREEN />
                        </Row>
                    </Form.Group>
                </Form>
                <Row className='editProduct__header'>Tính Năng</Row>

                <Form.Text className="text-danger">
                    Phân cách mỗi tính năng bằng ký tự&emsp; *
                </Form.Text><br />

                <Form.Text className="text-success">
                    Example: Xóa phông nổi bật*Tùy chỉnh ánh sáng thông minh
                </Form.Text>
                <Form as={Row} className='editProduct__body'>

                    <Form.Group as={Col} xs={2} md={6}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} value={editProduct.description ? editProduct.description : ''}
                            name='description'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={6}>
                        <Form.Label>Camera</Form.Label>
                        <Form.Control as="textarea" rows={4} value={editProduct.camera ? editProduct.camera : ''}
                            name='camera'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={6}>
                        <Form.Label>Video</Form.Label>
                        <Form.Control as="textarea" rows={4} value={editProduct.video ? editProduct.video: ''}
                            name='video'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={6}>
                        <Form.Label>Feature</Form.Label>
                        <Form.Control as="textarea" rows={4} value={editProduct.feature ? editProduct.feature : ''}
                            name='feature'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={6}>
                        <Form.Label>Graphic</Form.Label>
                        <Form.Control as="textarea" rows={3} value={editProduct.graphic ? editProduct.graphic : ''}
                            name='graphic'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                    <Form.Group as={Col} xs={2} md={6}>
                        <Form.Label>Material</Form.Label>
                        <Form.Control as="textarea" rows={3} value={editProduct.material ? editProduct.material : ''}
                            name='material'
                            onChange={(e) => {
                                onInputChange(e)
                            }} />
                    </Form.Group>
                </Form>
                <Row className='editProduct__header'>Hình Ảnh</Row>
                <Form as={Row} className='editProduct__body'>
                    <Col md={5}>
                        <input type="file"
                            
                            
                            onChange={(e) => {
                              

                                setPreviewFile(URL.createObjectURL(e.target.files[0]))
                                setFile(e.target.files[0])

                            }}
                        />

                    </Col>

                    <Col md={7}>

                        {/* <img src={file && editProduct.image ? `data:image/png;base64,${editProduct.image.data}` : previewFile} alt='No images' className='editProduct__body--imgwidth' /> */}
                        <img src={file && file.data ? `data:image/png;base64,${file.data}`: previewFile ? previewFile : ''} alt='No images' className='editProduct__body--imgwidth' />

                    </Col>


                </Form>
                <Row className='editProduct__grpbtn'>
                    <Button className='editProduct__grpbtn--btnSave' variant='success' onClick={handleCreateProduct}>Save</Button>
                    <Link to='/admin/product' className='btn btn-danger editProduct__grpbtn--btnClear'> Cancel</Link>
                </Row>

            </Container>

        </>




    )
}
