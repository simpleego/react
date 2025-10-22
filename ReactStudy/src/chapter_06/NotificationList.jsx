import React from "react";
import Notification from "./Notification";

const reservedNotification = [
    {
        id: 1,
        message: "안녕하세요, 오늘 일정을 알려드립니다."
    },
    {
        id: 2,
        message: "점심 식사 시간입니다."
    },
    {
        id: 3,
        message: "이제 곧 미팅이 시작됩니다."
    }
];

let timer;

class NotificationList extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            notifications: [],
        };
    }

    componentDidMount(){
        // 컴포넌트 생성시 자동 호출되는 메서드
        // 필요한 기능을 수행
        const { notifications} = this.state;
        timer = setInterval(()=>{
            if(notifications.length < reservedNotification.length){
                const index = notifications.length;
                notifications.push(reservedNotification[index]);
                //? 뭘해야 하나?
                this.setState({
                    notifications: notifications,
                });
            }else {
                this.setState({
                    notifications: [],
                });

                // 타이머 멈추기
                clearInterval(timer);
            }
        },3000);
    }

    componentWillUnmount(){
        console.log('타이머 종료, 컴포넌트 삭제됨...')
        if(timer){
            clearInterval(timer);
        }
    }

    render(){
        // 화면을 갱신한 내용을 기술
        return (
            <div>
                {this.state.notifications.map(
                    (notification)=>{
                        return (
                            <Notification
                                id={notification.id}
                                message={notification.message}
                            />
                        )}
                )}
            </div>
        );
    }
}

export default NotificationList;