/*！
 * @file pxt-SRLE/SRLE.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n Obloq is a serial port of WIFI connection module, Obloq can connect 
 *    to Microsoft Azure IoT and other standard MQTT protocol IoT.
 *
 * @copyright   [DFRobot](http://www.dfrobot.com), 2016
 * @copyright   MIT Lesser General Public License
 *
 * @author [email](jie.tang@dfrobot.com)
 * @version  V0.0.3
 * @date  2019-12-31
 */

const OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
const OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "api.beebotte.com"
const OBLOQ_MQTT_EASY_IOT_SERVER_EN = "iot.dfrobot.com"
const SRLE_WEBHOOKS_URL = "maker.ifttt.com"
const OBLOQ_MQTT_EASY_IOT_SERVER_TK = "api.thingspeak.com"
const SRLE_Weather_URL = "api.dfrobot.top"

enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

enum PIN {
    P15,
    P0,
    P1,
    P2,
    P8,
    P12,
    P16
};

/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="SRLE"
namespace SRLE {
    let BrightnessP15 = 255;
    let BrightnessP1 = 255;
    let BrightnessP0 = 255;
    let BrightnessP2 = 255;
    let BrightnessP8 = 255;
    let BrightnessP12 = 255;
    let BrightnessP16 = 255;
    let LenP15 = 4;
    let LenP1 = 4;
    let LenP0 = 4;
    let LenP2 = 4;
    let LenP8 = 4;
    let LenP12 = 4;
    let LenP16 = 4;
    let IIC_ADDRESS = 0x16
    let Topic0CallBack: Action = null;
    let Topic1CallBack: Action = null;
    let Topic2CallBack: Action = null;
    let Topic3CallBack: Action = null;
    let Topic4CallBack: Action = null;
    let Wifi_Status = 0x00

    let SRLE_WEBHOOKS_KEY = ""
    let SRLE_WEBHOOKS_EVENT = ""
    let SRLE_BEEBOTTE_Token = ""
    let SRLE_THINGSPEAK_KEY = ""

    let READ_STATUS = 0x00
    let SET_PARA = 0x01
    let RUN_COMMAND = 0x02

    /*set para*/
    let SETWIFI_NAME = 0x01
    let SETWIFI_PASSWORLD = 0x02
    let SETMQTT_SERVER = 0x03
    let SETMQTT_PORT = 0x04
    let SETMQTT_ID = 0x05
    let SETMQTT_PASSWORLD = 0x06
    let SETHTTP_IP = 0x07
    let SETHTTP_PORT = 0x08

    /*run command*/
    let SEND_PING = 0x01
    let CONNECT_WIFI = 0x02
    let RECONNECT_WIFI = 0x03
    let DISCONECT_WIFI = 0x04
    let CONNECT_MQTT = 0x05
    let SUB_TOPIC0 = 0x06
    let SUB_TOPIC1 = 0x07
    let SUB_TOPIC2 = 0x08
    let SUB_TOPIC3 = 0x09
    let SUB_TOPIC4 = 0x0A
    let PUB_TOPIC0 = 0x0B
    let PUB_TOPIC1 = 0x0C
    let PUB_TOPIC2 = 0x0D
    let PUB_TOPIC3 = 0x0E
    let PUB_TOPIC4 = 0x0F
    let GET_URL = 0x10
    let POST_URL = 0x11
    let PUT_URL = 0x12
    let GET_VERSION = 0x13
    let mqttState = 0
    let wifiConnected = 0
    let READmode = 0x00
    let versionState = 0


    /*read para value*/
    let READ_PING = 0x01
    let READ_WIFISTATUS = 0x02
    let READ_IP = 0x03
    let READ_MQTTSTATUS = 0x04
    let READ_SUBSTATUS = 0x05
    let READ_TOPICDATA = 0x06
    let HTTP_REQUEST = 0x10
    let READ_VERSION = 0x12

    /*para status */
    let PING_OK = 0x01
    let WIFI_DISCONNECT = 0x00
    let WIFI_CONNECTING = 0x02
    let WIFI_CONNECTED = 0x03
    let MQTT_CONNECTED = 0x01
    let MQTT_CONNECTERR = 0x02
    let DISCONNECT_MQTT = 0x15
    let SUB_TOPIC_OK = 0x01
    let SUB_TOPIC_Ceiling = 0x02


    let SRLEStatus = ""
    let WIFI_NAME = ""
    let WIFI_PASSWORLD = ""
    let MQTT_SERVER = ""
    let MQTT_PORT = ""
    let MQTT_ID = ""
    let MQTT_PASSWORLD = ""
    let Topic_0 = ""
    let Topic_1 = ""
    let Topic_2 = ""
    let Topic_3 = ""
    let Topic_4 = ""
    let RECDATA = ""
    let response_data = ""
    let HTTP_IP = ""
    let HTTP_PORT = ""
    let SRLE_IP = "0.0.0.0"
    let G_city = 0;

    export enum aMotors {
        //% blockId="M1" block="M1"
        M1 = 0,
        //% blockId="M2" block="M2"
        M2 = 1,
        //% blockId="ALL" block="ALL"
        ALL = 2
    }
    export enum aServos {
        //% blockId="S1" block="S1"
        S1 = 0,
        //% blockId="S2" block="S2"
        S2 = 1
    }
    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x0,
        //% blockId="CCW" block="CCW"
        CCW = 0x1
    }
    export enum SERVERS {
        //% blockId=SERVERS_China block="EasyIOT_CN"
        China,
        //% blockId=SERVERS_English block="EasyIOT_EN"
        English,

    }
    export enum TOPIC {
        topic_0 = 0,
        topic_1 = 1,
        topic_2 = 2,
        topic_3 = 3,
        topic_4 = 4
    }

    export class PacketMqtt {
        public message: string;
    }
    /**
     * Configure the micro:IoT servo.
     */
    //% weight=50
    //% blockId=SRLE_ServoRun block="Servo|%index|angle|%angle"
    //% angle.min=0 angle.max=180
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function SRLE_ServoRun(index: aServos, angle: number): void {
        let buf = pins.createBuffer(2);
        if (index == 0) {
            buf[0] = 0x14;
        }
        if (index == 1) {
            buf[0] = 0x15;
        }
        buf[1] = angle;
        pins.i2cWriteBuffer(0x16, buf);
    }
    /**
     * Configure the direction and speed of the micro:IoT motor 
     */
    //% weight=49
    //% blockId=SRLE_MotorRun block="Motor|%index|move|%Dir|at speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function SRLE_MotorRun(index: aMotors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
            if (direction == 0x00) {
                buf[1] = 0x01;
            } else {
                buf[1] = 0x00;
            }
        } else if (index == 1) {
            buf[0] = 0x02;
            buf[1] = direction;
        } else if (index == 2) {
            buf[0] = 0x00;
            if (direction == 0x00) {
                buf[1] = 0x01;
            } else {
                buf[1] = 0x00;
            }
            buf[2] = speed;
            pins.i2cWriteBuffer(IIC_ADDRESS, buf);
            buf[0] = 0x02;
            buf[1] = direction;
        } else {
        }
        buf[2] = speed;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }
    /**
     * Stop the motor
     */
    //% weight=48
    //% blockId=SRLE_motorStop block="Motor |%motors stop"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function SRLE_motorStop(motors: aMotors): void {
        let buf = pins.createBuffer(3);
        if (motors == 0) {
            buf[0] = 0x00;
        } else if (motors == 1) {
            buf[0] = 0x02;
        } else if (motors == 2) {
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(IIC_ADDRESS, buf);
            buf[0] = 0x02;
        }
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }


    function SRLE_setPara(cmd: number, para: string): void {
        let buf = pins.createBuffer(para.length + 4);
        buf[0] = 0x1E
        buf[1] = SET_PARA
        buf[2] = cmd
        buf[3] = para.length
        for (let i = 0; i < para.length; i++)
            buf[i + 4] = para[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function SRLE_runCommand(cmd: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function SRLE_readStatus(para: number): number {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        return recbuf[1]
    }

    function SRLE_readValue(para: number): string {
        let buf = pins.createBuffer(3);
        let paraValue = 0x00
        let tempLen = 0x00
        let dataValue = ""
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        SRLE_CheckStatus("READ_IP");
        return RECDATA
    }

    function SRLE_ParaRunCommand(cmd: number, data: string): void {
        let buf = pins.createBuffer(data.length + 4)
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        buf[3] = data.length
        for (let i = 0; i < data.length; i++)
            buf[i + 4] = data[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);

    }
    function SRLE_CheckStatus(cmd: string): void {
        let startTime = input.runningTime();
        let currentTime = 0;
        while (true) {
            currentTime = input.runningTime();
            if (SRLEStatus == cmd) {
                serial.writeString("OKOK\r\n");
                return;
            }
            basic.pause(50);
            if (versionState == 1) {
                if ((currentTime - startTime) > 20000)
                    return;
            }

        }
    }
    /**
    * WiFi configuration
    * @param SSID to SSID ,eg: "yourSSID"
    * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
    */
    //% weight=100
    //% blockId=SRLE_wifi block="Micro:IoT setup |Wi-Fi: |name: %SSID| password：%PASSWORD"
    export function SRLE_WIFI(SSID: string, PASSWORD: string): void {
        SRLE_setPara(SETWIFI_NAME, SSID)
        SRLE_setPara(SETWIFI_PASSWORLD, PASSWORD)
        SRLE_runCommand(CONNECT_WIFI)
        SRLE_CheckStatus("WiFiConnected");
        Wifi_Status = WIFI_CONNECTED
    }
    /**
     * MQTT configuration
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
    */
    //% weight=100
    //% blockExternalInputs=1
    //% blockId=SRLE_MQTT block="Micro:IoT setup mqtt|IOT_ID(user): %IOT_ID| IOT_PWD(password) :%IOT_PWD|(default topic_0) Topic: %IOT_TOPIC| server: %SERVERS"
    export function SRLE_MQTT(/*SSID: string, PASSWORD: string,*/
        IOT_ID: string, IOT_PWD: string,
        IOT_TOPIC: string, servers: SERVERS):
        void {
        if (servers == SERVERS.China) {
            SRLE_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_CHINA)
        } else if (servers == SERVERS.English) {
            SRLE_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_EN)
        } //else { SRLE_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL) }
        SRLE_setPara(SETMQTT_PORT, "1883")
        SRLE_setPara(SETMQTT_ID, IOT_ID)
        SRLE_setPara(SETMQTT_PASSWORLD, IOT_PWD)
        serial.writeString("wifi conneced ok\r\n");
        SRLE_runCommand(CONNECT_MQTT);
        SRLE_CheckStatus("MQTTConnected");
        serial.writeString("mqtt connected\r\n");
        basic.pause(100)
        Topic_0 = IOT_TOPIC
        SRLE_ParaRunCommand(SUB_TOPIC0, IOT_TOPIC);
        SRLE_CheckStatus("SubTopicOK");
        serial.writeString("sub topic ok\r\n");

    }
    /**
     * Add an MQTT subscription
     */
    //% weight=200
    //% blockId=SRLE_add_topic
    //% block="subscribe additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    export function SRLE_add_topic(top: TOPIC, IOT_TOPIC: string): void {
        SRLE_ParaRunCommand((top + 0x06), IOT_TOPIC);
        SRLE_CheckStatus("SubTopicOK");

    }
    /**
     * MQTT sends information to the corresponding subscription
     * @param Mess to Mess ,eg: "mess"
     */
    //% weight=99
    //% blockId=SRLE_SendMessage block="MQTT Send Message %string| to |%TOPIC"
    export function SRLE_SendMessage(Mess: string, Topic: TOPIC): void {
        let topic = 0

        switch (Topic) {
            case TOPIC.topic_0:
                topic = PUB_TOPIC0
                break;
            case TOPIC.topic_1:
                topic = PUB_TOPIC1
                break;
            case TOPIC.topic_2:
                topic = PUB_TOPIC2
                break;
            case TOPIC.topic_3:
                topic = PUB_TOPIC3
                break;
            case TOPIC.topic_4:
                topic = PUB_TOPIC4
                break;
            default:
                break;

        }
        SRLE_ParaRunCommand(topic, Mess)

    }

    function SRLE_callback(top: TOPIC, a: Action): void {
        switch (top) {
            case TOPIC.topic_0:
                Topic0CallBack = a;
                break;
            case TOPIC.topic_1:
                Topic1CallBack = a;
                break;
            case TOPIC.topic_2:
                Topic2CallBack = a;
                break;
            case TOPIC.topic_3:
                Topic3CallBack = a;
                break;
            case TOPIC.topic_4:
                Topic4CallBack = a;
                break;
            default:
                break;
        }
    }
    /**
     * MQTT processes the subscription when receiving message
     */
    //% weight=98
    //% blockGap=60
    //% blockId=obloq_mqtt_callback_user_more block="MQTT on %top |received"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function SRLE_MQTT_Event(top: TOPIC, cb: (message: string) => void) {
        SRLE_callback(top, () => {
            const packet = new PacketMqtt()
            packet.message = RECDATA
            cb(packet.message)
        });
    }
    /**
    * IFTTT configuration
    * @param EVENT to EVENT ,eg: "yourEvent"
    * @param KEY to KEY ,eg: "yourKey"
    */
    //% weight=80
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=SRLE_http_IFTTT
    //% block="Webhooks config:|event: %EVENT|key: %KEY|"
    export function SRLE_http_IFTTT(EVENT: string, KEY: string): void {
        SRLE_WEBHOOKS_EVENT = EVENT
        SRLE_WEBHOOKS_KEY = KEY
    }

    /**
     * Get http response
    */
    //% weight=78
    //% blockId=SRLE_http_wait_request
    //% block="Get HTTP response | timeout(ms) %time"
    export function SRLE_http_wait_request(time: number): string {
        if (time < 100) {
            time = 100
        }
        let timwout = time / 100
        let _timeout = 0
        while (true) {
            basic.pause(100)
            if (SRLEStatus == "HTTP_REQUEST") {
                SRLEStatus = "";
                return response_data
            } else if (SRLEStatus == "HTTP_REQUESTFailed") {
                SRLEStatus = "";
                return "requestFailed"
            }
            _timeout += 1
            if (_timeout > timwout) {
                return "timeOut"
            }
        }
    }
    /**
     * ThingSpeak configuration
     * @param KEY to KEY ,eg: "your Key"
     */

    //% weight=28
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_I2C_ThingSpeak_configura
    //% block="ThingSpeak configure key: %KEY"
    export function ThingSpeakConfigure(KEY: string): void {
        SRLE_THINGSPEAK_KEY = KEY
    }

    /**
    * ThingSpeak configured and sent data
    * @param field1 ,eg: 2020
    */

    //% weight=27
    //% blockId=WiFi_IoT_I2C_ThingSpeak_Configure
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% block="ThingSpeak send Field1: %field1||Field2: %field2|Field3: %field3|Field4: %field4|Field5: %field5|Field6: %field6|Field7: %field7 Field8: %field8" 
    export function ThingSpeakSend(field1: string, field2?: string, field3?: string, field4?: string, field5?: string, field6?: string, field7?: string, field8?: string): void {
        SRLE_setPara(SETHTTP_IP, OBLOQ_MQTT_EASY_IOT_SERVER_TK)
        let tempStr = ""
        tempStr = "update?api_key=" + SRLE_THINGSPEAK_KEY + "&field1=" + field1
        // if(field2 != undefined){
        //     tempStr += "&field2=" + field2
        // }else if(field3 != undefined){
        //     tempStr += "&field3=" + field3
        // }else if(field4 != undefined){
        //     tempStr += "&field4=" + field4
        // }else if(field5 != undefined){
        //     tempStr += "&field5=" + field5
        // }else if(field6 != undefined){
        //     tempStr += "&field6=" + field6
        // }else if(field7 != undefined){
        //     tempStr += "&field7=" + field7
        // }else if(field8 != undefined){
        //     tempStr += "&field8=" + field8
        // }else{
        //     tempStr += "\r"
        // }
        if (field2 != undefined)
            tempStr += "&field2=" + field2
        if (field3 != undefined)
            tempStr += "&field3=" + field3
        if (field4 != undefined)
            tempStr += "&field4=" + field4
        if (field5 != undefined)
            tempStr += "&field5=" + field5
        if (field6 != undefined)
            tempStr += "&field6=" + field6
        if (field7 != undefined)
            tempStr += "&field7=" + field7
        if (field8 != undefined)
            tempStr += "&field8=" + field8
        SRLE_ParaRunCommand(GET_URL, tempStr);
    }

    /**
     * IFTTT send data
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=78
    //% blockId=SRLE_http_post
    //% block="IFTTT(post) | value1 %value1| value2 %value2| value3 %value3| timeout(ms) %time"
    export function SRLE_http_post(value1: string, value2: string, value3: string, time: number): void {
        SRLE_setPara(SETHTTP_IP, SRLE_WEBHOOKS_URL)
        let tempStr = ""
        tempStr = "trigger/" + SRLE_WEBHOOKS_EVENT + "/with/key/" + SRLE_WEBHOOKS_KEY + ",{\"value1\":\"" + value1 + "\",\"value2\":\"" + value2 + "\",\"value3\":\"" + value3 + "\" }" + "\r"
        SRLE_ParaRunCommand(POST_URL, tempStr)
    }

    /**
     * send http request
    */
    //% weight=78
    //% blockId=send_http_request
    //% block="Send HTTP request | domain %domain| url %url| data %data| timeout(ms) %time"
    export function send_http_request(domain: string, url: string, data: string, time: number): void {
        SRLE_setPara(SETHTTP_IP, domain)
        let tempStr = ""
        //tempStr = "trigger/" + SRLE_WEBHOOKS_EVENT + "/with/key/" + SRLE_WEBHOOKS_KEY + ",{\"value1\":\"" + value1 + "\",\"value2\":\"" + value2 + "\",\"value3\":\"" + value3 + "\" }" + "\r"
        //tempStr = `${url}/?data=${data},{}\r`
        //tempStr = url + ",{\"data\":\"123\"}\r"
        //tempStr = "/apps/microbit/index.php?data=999"
        tempStr = `${url}?data=${data}`
        SRLE_ParaRunCommand(POST_URL, tempStr)
    }
    // /**Beebotte Configure 
    //  * @param token ,eg: "Your Channel Token"
    //  */
    // //%weight=30
    // //%blockID=WiFi_IoT_I2C_BeeBotte_Configura block="BeeBotte configura key: %token "
    // export function token(token:string):void{
    //     SRLE_BEEBOTTE_Token = token;
    // }
    // /**BeeBotte send data
    //  * @param channel ,eg: "Your Channel Name"
    //  * @param resource ,eg: "Your Resource Name"
    //  * @param data ,eg: "Send Message"
    //  */
    //  //%weight=29
    // //%blockID=WiFi_IoT_I2C_BeeBotte_sendmessage block="BeeBotte Channel: %channel Resource: %resource send value %data "
    // export function sendmessage(channel:string, resource:string, data:string){
    //     SRLE_setPara(SETHTTP_IP, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL)
    //     let tempStr = ""
    //     tempStr = "v1/data/write/" + channel + "/" + resource + "?token=" + SRLE_BEEBOTTE_Token +",{\"data\":" + data + "}\r\n";
    //     SRLE_ParaRunCommand(POST_URL, tempStr);
    // }


    /**
     * Get IP address.
    */

    //% weight=51
    //% blockId=SRLE_wifi_ipconfig
    //% block="ipconfig"
    //% advanced=true
    export function SRLE_wifi_ipconfig(): string {
        return SRLE_IP;
        //SRLE_readValue(READ_IP)
    }


    /**
     * Send the ping.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */

    //% weight=49
    //% blockId=Obloq_send_ping
    //% block="sendPing"
    //% advanced=true
    export function SRLE_send_ping(): boolean {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E;
        buf[1] = RUN_COMMAND;
        buf[2] = SEND_PING;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        SRLE_CheckStatus("PingOK");
        return true;
    }


    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */

    //% weight=50
    //% blockId=SRLE_get_version
    //% block="get version"
    //% advanced=true
    export function SRLE_get_version(): string {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E;
        buf[1] = RUN_COMMAND;
        buf[2] = GET_VERSION;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        //SRLE_CheckStatus("READ_VERSION");
        return RECDATA
    }


    /**
     * Heartbeat request.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=48
    //% blockId=SRLE_get_heartbeat
    //% block="get heartbeat"
    //% advanced=true
    export function SRLE_get_heartbeat(): boolean {
        return true
    }

    /**
     * Stop the heartbeat request.
    */
    //% weight=47
    //% blockId=SRLE_stop_heartbeat
    //% block="stop heartbeat"
    //% advanced=true
    export function SRLE_stop_heartbeat(): boolean {
        return true
    }

    function SRLE_GetData(len: number): void {
        RECDATA = ""
        let tempbuf = pins.createBuffer(1)
        tempbuf[0] = 0x22
        pins.i2cWriteBuffer(IIC_ADDRESS, tempbuf);
        let tempRecbuf = pins.createBuffer(len)
        tempRecbuf = pins.i2cReadBuffer(IIC_ADDRESS, len, false)
        for (let i = 0; i < len; i++) {
            RECDATA += String.fromCharCode(tempRecbuf[i])
        }

        if (SRLEStatus == 'HTTP_REQUEST') {
            response_data = RECDATA;
        }

        serial.writeLine(RECDATA);
    }

    function SRLE_InquireStatus(): void {

        let buf = pins.createBuffer(3)
        let tempId = 0
        let tempStatus = 0
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = 0x06
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        tempId = recbuf[0]
        tempStatus = recbuf[1]
        switch (tempId) {
            case READ_PING:
                if (tempStatus == PING_OK) {
                    SRLEStatus = "PingOK"
                } else {
                    SRLEStatus = "PingERR"
                }
                break;
            case READ_WIFISTATUS:
                if (tempStatus == WIFI_CONNECTING) {
                    SRLEStatus = "WiFiConnecting"
                } else if (tempStatus == WIFI_CONNECTED) {
                    SRLEStatus = "WiFiConnected"
                } else if (tempStatus == WIFI_DISCONNECT) {
                    SRLEStatus = "WiFiDisconnect"
                    wifiConnected++;
                    if (wifiConnected == 2) {
                        wifiConnected = 0;
                        SRLE_runCommand(WIFI_CONNECTED);
                    }
                } else {
                } break;
            case READ_MQTTSTATUS:
                if (tempStatus == MQTT_CONNECTED) {
                    SRLEStatus = "MQTTConnected"
                    mqttState = 1;
                } else if (tempStatus == MQTT_CONNECTERR) {
                    SRLEStatus = "MQTTConnectERR"

                } else if (tempStatus == 0) {//新版本修复重连
                    SRLE_runCommand(DISCONNECT_MQTT);
                    SRLE_runCommand(WIFI_CONNECTED);
                }
                break;
            case READ_SUBSTATUS:
                if (tempStatus == SUB_TOPIC_OK) {
                    SRLEStatus = "SubTopicOK"
                } else if (tempStatus == SUB_TOPIC_Ceiling) {
                    SRLEStatus = "SubTopicCeiling"
                } else {
                    SRLEStatus = "SubTopicERR"
                }
                break;
            case READ_IP:
                SRLEStatus = "READ_IP"
                SRLE_GetData(tempStatus)
                SRLE_IP = RECDATA
                if (mqttState == 1) {
                    mqttState = 0;
                    SRLE_runCommand(DISCONNECT_MQTT);
                    basic.pause(200)
                    SRLE_runCommand(CONNECT_MQTT);
                    //SRLE_CheckStatus("MQTTConnected");
                }
                break;
            case SUB_TOPIC0:
                SRLEStatus = "READ_TOPICDATA"
                SRLE_GetData(tempStatus)
                if (Topic0CallBack != null) {
                    Topic0CallBack();
                }
                break;
            case SUB_TOPIC1:
                SRLEStatus = "READ_TOPICDATA"
                SRLE_GetData(tempStatus)
                if (Topic1CallBack != null) {
                    Topic1CallBack();
                }
                break;
            case SUB_TOPIC2:
                SRLEStatus = "READ_TOPICDATA"
                SRLE_GetData(tempStatus)
                if (Topic2CallBack != null) {
                    Topic2CallBack();
                }
                break;
            case SUB_TOPIC3:
                SRLEStatus = "READ_TOPICDATA"
                SRLE_GetData(tempStatus)
                if (Topic3CallBack != null) {
                    Topic3CallBack();
                }
                break;
            case SUB_TOPIC4:
                SRLEStatus = "READ_TOPICDATA"
                SRLE_GetData(tempStatus)
                if (Topic4CallBack != null) {
                    Topic4CallBack();
                }
                break;
            case HTTP_REQUEST:
                SRLEStatus = "HTTP_REQUEST"
                if (response_data == "") {
                    SRLE_GetData(tempStatus)
                }
                break;
            case READ_VERSION:
                SRLEStatus = "READ_VERSION"
                SRLE_GetData(tempStatus)
                break;
            default:
                break;
        }
        basic.pause(50);
    }
    basic.forever(function () {
        SRLE_InquireStatus();
    })



    /**
    * Initialize OLED, just put the module in the module at the beginning of the code, no need to reuse
    */

    //% weight=200
    //% block="init device"
    export function SRLE_initDisplay(): void {

        SRLE_cmd(0xAE);  // Set display OFF
        SRLE_cmd(0xD5);  // Set Display Clock Divide Ratio / OSC Frequency 0xD4
        SRLE_cmd(0x80);  // Display Clock Divide Ratio / OSC Frequency 
        SRLE_cmd(0xA8);  // Set Multiplex Ratio
        SRLE_cmd(0x3F);  // Multiplex Ratio for 128x64 (64-1)
        SRLE_cmd(0xD3);  // Set Display Offset
        SRLE_cmd(0x00);  // Display Offset
        SRLE_cmd(0x40);  // Set Display Start Line
        SRLE_cmd(0x8D);  // Set Charge Pump
        SRLE_cmd(0x14);  // Charge Pump (0x10 External, 0x14 Internal DC/DC)
        SRLE_cmd(0xA1);  // Set Segment Re-Map
        SRLE_cmd(0xC8);  // Set Com Output Scan Direction
        SRLE_cmd(0xDA);  // Set COM Hardware Configuration
        SRLE_cmd(0x12);  // COM Hardware Configuration
        SRLE_cmd(0x81);  // Set Contrast
        SRLE_cmd(0xCF);  // Contrast
        SRLE_cmd(0xD9);  // Set Pre-Charge Period
        SRLE_cmd(0xF1);  // Set Pre-Charge Period (0x22 External, 0xF1 Internal)
        SRLE_cmd(0xDB);  // Set VCOMH Deselect Level
        SRLE_cmd(0x40);  // VCOMH Deselect Level
        SRLE_cmd(0xA4);  // Set all pixels OFF
        SRLE_cmd(0xA6);  // Set display not inverted
        SRLE_cmd(0xAF);  // Set display On
        SRLE_clear();
        let Version = SRLE.SRLE_get_version();
        if (Version == "V4.1") {
            versionState = 1
            let buf = pins.createBuffer(3);
            buf[0] = 0x1E;
            buf[1] = 0x02;
            buf[2] = 0x17;
            pins.i2cWriteBuffer(IIC_ADDRESS, buf);
            basic.pause(2000)
        }
    }
    /**
     * OLED clear
     */
    //% weight=60
    //% block="clear OLED"
    export function SRLE_clear() {
        for (let j = 0; j < 8; j++) {
            SRLE_setText(j, 0);
            {
                for (let i = 0; i < 16; i++)  //clear all columns
                {
                    SRLE_putChar(' ');
                }
            }
        }
        SRLE_setText(0, 0);
    }

    function SRLE_setText(row: number, column: number) {
        let r = row;
        let c = column;
        if (row < 0) { r = 0 }
        if (column < 0) { c = 0 }
        if (row > 7) { r = 7 }
        if (column > 15) { c = 15 }

        SRLE_cmd(0xB0 + r);            //set page address
        SRLE_cmd(0x00 + (8 * c & 0x0F));  //set column lower address
        SRLE_cmd(0x10 + ((8 * c >> 4) & 0x0F));   //set column higher address
    }

    function SRLE_putChar(c: string) {
        let c1 = c.charCodeAt(0);
        SRLE_writeCustomChar(basicFont[c1 - 32]);
    }
    /**
     * @param line line num (8 pixels per line), eg: 0
     * @param text value , eg: DFRobot
     * OLED  display string
     */
    //% weight=60
    //% text.defl="DFRobot"
    //% line.min=0 line.max=7
    //% block="OLED show text %text|on line %line"
    export function SRLE_showUserText(line: number, text: string): void {
        SRLE_setText(line, 0);
        for (let c of text) {
            SRLE_putChar(c);
        }

        for (let i = text.length; i < 16; i++) {
            SRLE_setText(line, i);
            SRLE_putChar(" ");
        }

    }
    /**
     * @param line line num (8 pixels per line), eg: 0
     * @param n value , eg: 2019
     * OLED  shows the number
     */
    //% weight=60
    //% line.min=0 line.max=7
    //% block="OLED show number %n|on line %line"

    export function SRLE_showUserNumber(line: number, n: number): void {
        SRLE.SRLE_showUserText(line, "" + n)
    }


    function SRLE_writeCustomChar(c: string) {
        for (let i = 0; i < 8; i++) {
            SRLE_writeData(c.charCodeAt(i));
        }
    }


    function SRLE_cmd(c: number) {
        pins.i2cWriteNumber(0x3C, c, NumberFormat.UInt16BE);
    }


    function SRLE_writeData(n: number) {
        let b = n;
        if (n < 0) { n = 0 }
        if (n > 255) { n = 255 }

        pins.i2cWriteNumber(0x3C, 0x4000 + b, NumberFormat.UInt16BE);
    }

    const DISPLAY_OFF = 0xAE;
    const DISPLAY_ON = 0xAF;
    const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ];

    /**
     * Set the three primary color:red, green, and blue
     * @param r , eg: 255
     * @param g  , eg: 255
     * @param b  , eg: 255
     */
    //% weight=60
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //%  block="red %r green %g blue %b"
    export function SRLE_rgb(r: number, g: number, b: number): number {
        return (r << 16) + (g << 8) + (b);
    }

    /**
     * Setting the Number of lights
     * @param len , eg: 7
     */
    //% weight=60
    //% len.min=0 len.max=40
    //%  block="pin %pin %len RGB LEDs"
    export function SRLE_length(pin: PIN, len: number): void {
        switch (pin) {
            case PIN.P0:
                LenP0 = len
                break;
            case PIN.P1:
                LenP1 = len
                break;
            case PIN.P2:
                LenP2 = len
                break;
            case PIN.P8:
                LenP8 = len
                break;
            case PIN.P12:
                LenP12 = len
                break;
            case PIN.P15:
                LenP15 = len
                break;
            default:
                LenP16 = len
                break;
        }
    }

    /**
     * Set the color of the specified LEDs
     * @param start , eg: 0
     * @param stop , eg: 4
     */
    //% weight=60
    //% inlineInputMode=inline
    //% start.min=0 start.max=40
    //% stop.min=0 stop.max=40
    //% rgb.shadow="colorNumberPicker"
    //%  block="pin %pin RGB %start to %stop show color %rgb"
    export function SRLE_setIndexColor(pin: PIN, start: number, stop: number, rgb: number) {
        let bufLength = 40 * 3;
        let neopixel_buf = pins.createBuffer(bufLength);
        for (let i = 0; i < bufLength; i++) {
            neopixel_buf[i] = 0
        }
        let _pin;
        let _brightness;
        switch (pin) {
            case PIN.P0:
                _pin = DigitalPin.P0;
                _brightness = BrightnessP0;
                break;
            case PIN.P1:
                _pin = DigitalPin.P1;
                _brightness = BrightnessP1;
                break;
            case PIN.P2:
                _pin = DigitalPin.P2;
                _brightness = BrightnessP2;
                break;
            case PIN.P8:
                _pin = DigitalPin.P8;
                _brightness = BrightnessP8;
                break;
            case PIN.P12:
                _pin = DigitalPin.P12;
                _brightness = BrightnessP12;
                break;
            case PIN.P15:
                _pin = DigitalPin.P15;
                _brightness = BrightnessP15;
                break;
            default:
                _pin = DigitalPin.P16;
                _brightness = BrightnessP16;
                break;
        }
        let f = start;
        let t = stop;
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        for (let i = f; i <= t; i++) {
            neopixel_buf[i * 3 + 0] = Math.round(g)
            neopixel_buf[i * 3 + 1] = Math.round(r)
            neopixel_buf[i * 3 + 2] = Math.round(b)
        }
        //ws2812b.sendBuffer(neopixel_buf, _pin)
    }

    /**
     * Set the brightness of RGB LED
     * @param brightness , eg: 100
     */
    //% weight=60
    //% brightness.min=0 brightness.max=255
    //% block="pin %pin LED brightness %brightness"
    export function SRLE_setBrightness(pin: PIN, brightness: number) {
        switch (pin) {
            case PIN.P0:
                BrightnessP0 = brightness;
                break;
            case PIN.P1:
                BrightnessP1 = brightness;
                break;
            case PIN.P2:
                BrightnessP2 = brightness;
                break;
            case PIN.P8:
                BrightnessP8 = brightness;
                break;
            case PIN.P12:
                BrightnessP12 = brightness;
                break;
            case PIN.P15:
                BrightnessP15 = brightness;
                break;
            default:
                BrightnessP16 = brightness;
                break;
        }
    }
    /**
     * Turn off all RGB LEDs
     */
    //% weight=60
    //%  block="pin %pin clear all LEDs"
    export function SRLE_ledBlank(pin: PIN) {
        let _len;
        switch (pin) {
            case PIN.P0:
                _len = LenP0;
                break;
            case PIN.P1:
                _len = LenP1
                break;
            case PIN.P2:
                _len = LenP2
                break;
            case PIN.P8:
                _len = LenP8
                break;
            case PIN.P12:
                _len = LenP12
                break;
            case PIN.P15:
                _len = LenP15
                break;
            default:
                _len = LenP16
                break;
        }
        SRLE_setIndexColor(pin, 0, _len, 0);
    }

}