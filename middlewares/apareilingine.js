import _ from 'underscore';
import Chance from 'chance';
import moment from 'moment';

const chance = new Chance();
const HOUR_FORMAT = 'HH:mm:ss';
const STATUS = ['AVAILABLE', 'TALKING', 'AFTER WORK', 'NOT AVAILABLE'];

class Engine {
    constructor(options, socket) {
        this.io = socket || null;
        this.agentsNumber = options.agents || 10;
        this.lastDaySendData = new Date().getDate();
        this.callCenter = {
            agents: [],
            statistics: {
                by: {
                    status: {},
                    calls: {
                        accepted: 0,
                        rejected: 0
                    }
                }
            },
            alerts: []
        };
    }

    init() {
        for (let i = 1; i <= this.agentsNumber; i++) {
            let tmpName = chance.name({ nationality: 'en' });
            let nameParts = tmpName.split(' ');

            this.callCenter.agents.push({
                id: chance.guid(),
                ext: 1000 + i,
                agent: '1000' + i,
                name: `${nameParts[0][0]}. ${nameParts[1]}`,
                status: _.sample(STATUS),
                stateChangeTime: moment().format(HOUR_FORMAT),
                teams: ['Team 1', 'Team 2'],
                skills: ['Sk 1001', 'Sk 1002'],
                statistics: {
                    by: {
                        calls: {
                            accepted: 0,
                            rejected: 0
                        }
                    }
                },
                viewMode: 0
            });
        }
    }

    run() {
        const timing = _.random(0.2, 1.5) * 2000;
        this.callCenter.timing = timing;

        // Reset statistics every day
        const today = new Date().getDate();
        if (this.lastDaySendData !== today) {
            this.resetDailyStatistics();
            this.lastDaySendData = today;
        }

        setTimeout(() => {
            this.updateAgentStatus();
            this.emitStatusUpdate();
            this.run();
        }, timing);
    }

    resetDailyStatistics() {
        this.callCenter.statistics.by.calls.accepted = 0;
        this.callCenter.statistics.by.calls.rejected = 0;
        this.callCenter.agents.forEach((agent) => {
            agent.statistics.by.calls.accepted = 0;
            agent.statistics.by.calls.rejected = 0;
        });
    }

    updateAgentStatus() {
        let samples = _.random(0, this.agentsNumber);
        let agentsSample = _.sample(this.callCenter.agents, _.random(0, samples / 2));
        this.callCenter.alerts = [];

        agentsSample.forEach((agent) => {
            agent.status = _.sample(STATUS);
            agent.stateChangeTime = moment().format(HOUR_FORMAT);

            if (agent.status === 'TALKING') {
                agent.statistics.by.calls.accepted++;
                this.callCenter.statistics.by.calls.accepted++;
            } else if (agent.status === 'NOT AVAILABLE') {
                agent.statistics.by.calls.rejected++;
                this.callCenter.statistics.by.calls.rejected++;
            }
        });

        this.callCenter.statistics.by.status = _.countBy(this.callCenter.agents, 'status');
        if (!this.callCenter.statistics.by.status['AVAILABLE']) {
            this.callCenter.alerts.push('No hay agentes disponibles!');
        }
    }

    emitStatusUpdate() {
        if (this.io) {
            this.io.emit('call center status', this.callCenter);
        }
    }
}

export default Engine;
