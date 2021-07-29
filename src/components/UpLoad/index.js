import { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './index.css'

function UpLoad(props) {

  const [files, setFiles] = useState({})

  function onFileChage(e) {
    let file = e.target.files 
    setFiles(file)

    let formData = new FormData()
    formData.append("upload-file", file[0])
    formData.append("fileName", file[0].name)
    props.changeValue(formData)
  }

  return (
    <>
      <span className="comp_model-training__file-upload-wrap">
        <span className="upload-btn">上传文件</span>
        <input className="upload-input" type="file" accept={props.accees} onChange={e => onFileChage(e)} />
      </span>
      {
        files[0] && !!files[0].name &&
        <span style={{ marginLeft: 80 }}>{ files[0].name }</span>
      }
    </>
  )
}

UpLoad.propTypes = {
  accees: PropTypes.string,
  changeValue: PropTypes.func
}

UpLoad.defaultProps = {
  accees: '*',
  changeValue: _.noop
}

export default UpLoad