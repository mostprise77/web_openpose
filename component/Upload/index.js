import { Upload, Icon, Modal, message } from 'antd';
import styles from './index.less';

export default class ImageUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  is_video = () => {
    var link = this.state.previewImage;
    var type = link.substring(link.lastIndexOf('.') + 1, link.length);
    const array = ['mp4', 'avi', 'mpv','mov', 'flv', 'mpeg'];
    var back = array.find(res => res == type.toLocaleLowerCase()) != undefined ? true : false;
    return back;
  };

  componentDidMount() {
    let array = [];
    const props = this.props;
    //console.log(props.value);
    if (
      props.value &&
      props.value != ' ' &&
      props.value != ',' &&
      props.value != 'undefined' &&
      props.value != undefined
    ) {
      //console.log('gg');
      (props.value || '').split(',').map((res, index) => {
        if (res != '' && res != 'undefined')
          array.push({
            uid: index,
            url: res,
            response: {
              code: 201,
              src: res,
            },
          });
      });
      this.setState({
        fileList: array,
      });
    } else {
      //console.log('nogg');
    }
  }

  componentWillReceiveProps(props) {
    if (this.props === props) return;
    let array = [];
    ////console.log(this.props.value);
    if (
      props.value &&
      props.value != ' ' &&
      props.value != ',' &&
      props.value != 'undefined' &&
      props.value != undefined
    ) {
      (props.value || '').split(',').map((res, index) => {
        if (res != '')
          array.push({
            uid: index,
            url: res,
            response: {
              code: 201,
              src: res,
            },
          });
      });

      this.setState({
        fileList: array,
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    var flag = false;
    const file = fileList.filter(res => {
      if (res && res.response) {
        if (res.response.code == 201) {
          return true;
        }
        message.error('上传失败，请重试');
        return false;
      } else {
        return true;
      }
    });

    this.setState({
      fileList: file,
    });
    var fileArr = [];
    file.map(res => {
      if (res && res.response) {
        if (res.response.code == 201) fileArr.push(res.response.src);
      }
        if (fileList.length == fileArr.length) this.props.onChange(res.response.src);

    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    //console.log(fileList);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className={this.props.onlyView ? styles.onlyView : ''}>
        <Upload
          action="http://up.mostprise.com/oss1/upload.php"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          multiple={true}
        >
          {this.props.onlyView || fileList.length >= (this.props.length?this.props.length:30) ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          {this.is_video(previewImage) ? (
            <video className={styles.video} src={previewImage} controls />
          ) : (
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          )}
        </Modal>
      </div>
    );
  }
}
