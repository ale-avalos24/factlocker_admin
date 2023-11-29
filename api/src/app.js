// Express definition
import express from "express";
const app = express();

// Imported routes
import UserRoutes from './routes/user.routes';
import AuthDeviceRoutes from './routes/authdevice.routes';
import AuthReqRoutes from './routes/authreq.routes';
import AccessGroupRouter from './routes/accessgroup.routes';
import AuthRouter from './routes/auth.routes';

// App settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());

// App uses defined routes
app.use('/api/users', UserRoutes);
app.use('/api/auth_devices', AuthDeviceRoutes);
app.use('/api/auth_requests', AuthReqRoutes);
app.use('/api/access_groups', AccessGroupRouter);
app.use('/api/auth', AuthRouter);

export default app;