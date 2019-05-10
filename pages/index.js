import Link from 'umi/link';
import {Component} from 'react';
import {Layout,Card,List,  Modal, Spin, Button, Icon,} from 'antd'
import Up from '../component/Upload';
import {HTTP} from "../service/http";
import styles from './index.less'
export default class Index extends Component {

    state={
        show:false,
        data:[
        ]
    }
    componentDidMount(){
    HTTP.get('')
    }
    checkData=()=>{

    }

    download = (link)=>{
        const a = document.createElement('a')
        a.setAttribute('download', '')
        a.setAttribute('href', link)
        a.click()
    }

    uoload =(e)=>{

        let name = e.split('/')
        name=name[name.length-1]
        let url = 'http://ai-fitness.cn/download/'
        let data={
            url:e,
            title:name,
            zip:url+'zip/'+name+'.zip',
            video_prev:e,
            loading:true,
        }
        this.setState({
            data:[data,...this.state.data]
        })

        HTTP.get(`http://ai-gym.com/service/?file_path=${encodeURIComponent(e)}`).then(r=>{
           let index=this.state.data.findIndex(i=>i.url==e);
           this.state.data[index].loading=false;
           this.state.data[index].video_prev=url+'video/'+name;
           let d=[...this.state.data]
           this.setState({
               data:d
           });

        })
    }
    render() {
        const {data}=this.state;
        return <Layout>

            {this.state.show && <Modal
                onCancel={() => {
                    this.setState({
                        show: false
                    })
                }}
                onOk={() => {
                    this.setState({
                        show: false
                    })
                }}
                width={500}
                visible={this.state.show}
            >
                <video
                    width={400}
                    height='auto'
                    autoPlay={true}
                    controls={true}
                    src={this.state.video_src}>

                    <source src={this.state.video_src}/>
                </video>
            </Modal>
            }
            <Card
            title="人体动作在线识别"
            >
                <Up
                onChange={this.uoload}
                />

            </Card>

            <Card>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <Spin spinning={item.loading} >
                        <List.Item>
                                <List.Item.Meta
                                title={<a target="_blank" >{item.title}</a>}
                                description={
                                    <div className={styles.video}>
                                        <video height={100} width={100} src={item.video_prev}></video>
                                    </div>
                                }
                            />
                            <Button onClick={()=>{
                                this.setState({
                                    video_src:item.video_prev,
                                    show:true
                                })
                            }} className={styles.btn} type="primary">播放视频</Button>
                            <Button
                            onClick={()=>this.download(item.zip)}
                            >下载文件</Button>
                        </List.Item>
                        </Spin>

                    )}
                />
            </Card>
        </Layout>
    }
}
