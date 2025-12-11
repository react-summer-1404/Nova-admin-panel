import { Col, Row } from "reactstrap";
import ChatBox from "./ChatBox";

export default function ChatPage() {
    return (
        <Row>
            <Col>
                <h1 className="mb-3">چت ادمین</h1>
                <ChatBox />
            </Col>
        </Row>
    );
}