package com.chutneytesting.task.jms.consumer;

import com.chutneytesting.task.jms.consumer.bodySelector.BodySelector;
import com.chutneytesting.task.jms.consumer.bodySelector.BodySelectorFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Queue;
import javax.jms.QueueBrowser;
import javax.jms.Session;

public class ConsumerFactory {

    private final BodySelectorFactory bodySelectorFactory = new BodySelectorFactory();
    private final JmsListenerParameters arguments;

    public ConsumerFactory(JmsListenerParameters arguments) {
        this.arguments = arguments;
    }

    public Consumer build(Session session, Destination destination) throws JMSException {
        final Consumer consumer;
        if (arguments.bodySelector == null) {
            MessageConsumer messageConsumer = session.createConsumer(destination, arguments.selector);
            consumer = new SimpleMessageConsumer(messageConsumer, arguments.timeout);
        } else {
            QueueBrowser browser = session.createBrowser((Queue) destination, arguments.selector);
            BodySelector bodySelector = bodySelectorFactory.build(arguments.bodySelector);
            consumer = new SelectedMessageConsumer(browser, bodySelector, arguments.browserMaxDepth);
        }
        return consumer;
    }
}
