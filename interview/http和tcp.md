1. HTTP1.0 、HTTP1.1 
    1.1 缓存策略， expire、last-modified vs Cache-Control、etag
    1.2 带宽优化，HTTP1.1支持断点续传
    1.3 在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个 IP 地址
    1.4 HTTP1.0 需要使用keep-alive参数来告知服务器端要建立一个长连接，而 HTTP1.1 默认支持长连接
    1.5 HTTP1.1 新增了很多错误码 和 请求方式 PUT, DELETE, OPTION

2. HTTP2.0 和 HTTP1.x
    2.1 HTTP1.X 版本的缺陷概括来说是：线程阻塞，在同一时间，同一域名的请求有一定的数量限制，超过限制数目的请求会被阻塞。
    2.2 二进制分帧， HTTP1.x 的解析是基于文本， HTTP2.0 的协议解析决定采用二进制格式
    2.3 多路复用，多路复用允许同时通过单一的 HTTP2.0 连接发起多重的请求-响应消息。这样一个连接上可以有多个 request，每个连接的 request 可以随机的混杂在一起，接收方可以根据 request 的 id 将 request 再归属到各自不同的服务端请求里面。
    在 HTTP1.1 协议中浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制。超过限制数目的请求会被阻塞。这也是为何一些站点会有多个静态资源 CDN 域名的原因之一
    2.4 header压缩，HTTP1.x 的 header 带有大量信息，而且每次都要重复发送，HTTP2.0 使用 HPACK 算法对 header 的数据进行压缩，减少需要传输的 header 大小，通讯双方各自 cache 一份 header fields 表，差量更新 HTTP 头部，既避免了重复 header 的传输，又减小了需要传输的大小
    2.5 服务端推送

3. HTTP3.0
    HTTP/3 使用的底层传输协议 QUIC 是基于 UDP 的，因此需要在应用层实现可靠的数据传输。QUIC 协议使用了以下几种机制来保证数据的可靠性：
    3.1 连接迁移：QUIC 允许在网络切换或 IP 变更时迁移连接，而不需要重新建立新的连接，从而避免了连接中断和数据丢失的问题。
    3.2 可靠性流控制：QUIC 在每个流上都实现了可靠的流控制机制，可以根据发送方和接收方的负载情况动态调整数据发送速率，从而优化传输效率和可靠性。
    3.3 数据重传：QUIC 中每个数据包都带有唯一标识符（Packet Number），接收方可以根据这个标识符进行数据包的确认和重传，以保证数据传输的可靠性。
    3.4 拥塞控制：QUIC 采用了基于 TCP 的拥塞控制机制，可以根据网络拥塞程度自适应调整发送速率，以避免网络拥塞和丢包等问题

4. tcp 和 udp
    2.1 连接方式：TCP 是面向连接的协议，需要在通信前建立连接，而 UDP 是无连接的协议，可以直接发送数据包。
    2.2 可靠性：TCP 保证传输数据的可靠性，能够保证所有数据到达目的地且顺序正确；UDP 不保证传输数据的可靠性，可能会出现数据丢失或乱序等问题。
    2.3 开销：TCP 在传输过程中要维护连接状态、进行流量控制、拥塞控制等操作，因此开销较大；UDP 没有这些机制，传输开销较小。
    2.4 速度：由于 TCP 需要保证数据的可靠性，因此传输速度可能会受到一定的影响；UDP 没有这个限制，传输速度快。
    2.5 适用场景：TCP 适用于对可靠性要求较高的应用场景，如文件传输、邮件传输等；而 UDP 适用

5.  三次握手
    5.1 客户端随机初始化一个序列号放在TCP报文的头部，然后将SYN标志位设置为1。接着把第一个SYN报文发给服务端，表示把第一个SYN报文发给服务端。此时客户端处于SYN-SENT阶段
    5.2 服务端接收到SYN报文后，随机初始化自己的序列号，将此序列号放在TCP首部的序号字段中。接着把SYN 和 ACK标志设置为1 。最后把该报文发给客户端，标识确认应答，此时服务端处于SYN-RCVD状态
    5.3 客户端收到服务端报文后，还要发起一个应答报文，将此报文的ACK标志设置为1，确认应答号设置为服务端序列号+1， 这次报文可以携带应用层数据，之后客户端处于ESTABLISHED状态。
    5.4 其中起关键左右的是序列号和SYN、ACK标志位， 第三次是可以携带数据的
    5.5 为什么要三次
        如果没有第三次握手告诉服务器端客户端收的到服务器端传输的数据的话，服务器端是不知道客户端有没有接收到服务器端返回的信息的。服务端就认为这个连接是可用的，端口就一直开着，等到客户端因超时重新发出请求时，服务器就会重新开启一个端口连接。

6. 四次挥手
    6.1 客户端发送一个FIN报文，表示客户端不再发送数据了但是还能接收数据。
    6.2 服务器收到客户端的 FIN 报文时，先回一个 ACK 应答报文，而服务端可能还有数据需要处理和发送
    6.3 等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接。
    6.4 客户端在经过 2MSL（Maximum Segment Lifetime） 一段时间后，自动进入 CLOSED 状态，至此客户端也完成连接的关闭。
    6.5 每个方向都需要一个 FIN 和一个 ACK，因此通常被称为四次挥手。

7. 状态码：
    2XX (Success 成功状态码) 200， 204， 206
    3XX (Redirection 重定向状态码) 301， 302  304
    4XX (Client Error 客户端错误状态码) 401 Unauthorized 403 Forbidden 404 Not Found 405 Method Not Allowed
    5XX (Server Error 服务器错误状态码)